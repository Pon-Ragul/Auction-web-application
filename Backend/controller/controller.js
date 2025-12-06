const { AuctionItem, Bid, User, mongoose } = require('../model/model.js');
const { logger, formatTimeLeft } = require('../util/util.js');

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "USER ALREADY EXISTS" });

    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(200).json({ 
      message: "USER REGISTERED SUCCESSFULLY",
      id: newUser._id
    });
  } catch (error) {
    console.error("SIGNUP ERROR:", error);
    res.status(500).json({ message: "INTERNAL SERVER ERROR" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "USER NOT FOUND. PLEASE SIGN UP." });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "INVALID PASSWORD. PLEASE TRY AGAIN" });
    }

    res.status(200).json({ 
      message: "LOGIN SUCCESSFUL", 
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      },
      id: user._id
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({ message: "INTERNAL SERVER ERROR" });
  }
};

const auctionTimers = new Map();

const createAuction = async (req, res) => {
  try {
    logger.info('Received auction item data:', req.body);
    logger.info('Received files:', req.files ? req.files.length : 0);
    
    const { itemName, category, description, sellerId, sellerName, startDate, endDate } = req.body;
    const startingPrice = req.body.startingPrice === undefined ? undefined : parseFloat(req.body.startingPrice);

    if (!itemName || !category || !description || isNaN(startingPrice) || !sellerId || !sellerName || !startDate || !endDate) {
      return res.status(400).json({ message: 'MISSING_REQUIRED_FIELDS' });
    }

    let validSellerId = sellerId;
    if (!mongoose.Types.ObjectId.isValid(sellerId)) {
      logger.warn('Invalid sellerId provided:', sellerId);
      validSellerId = new mongoose.Types.ObjectId();
    }

    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (startDateObj < today) {
      return res.status(400).json({ message: 'START_DATE_CANNOT_BE_IN_PAST' });
    }

    if (endDateObj <= startDateObj) {
      return res.status(400).json({ message: 'END_DATE_MUST_BE_AFTER_START_DATE' });
    }

    const images = (req.files || []).map((file) => ({
      data: file.buffer,
      contentType: file.mimetype,
      fileName: file.originalname,
      size: file.size,
    }));

    const auctionItem = new AuctionItem({
      itemName,
      category,
      description,
      startingPrice,
      startDate: startDateObj,
      endDate: endDateObj,
      sellerId: validSellerId,
      sellerName,
      images,
      currentBid: startingPrice,
      currentBidder: '',
    });

    const saved = await auctionItem.save();
    logger.info('Auction item saved successfully:', saved._id);
    
    if (saved.isActive && new Date(saved.endDate) > new Date()) {
      startAuctionTimer(saved);
    }
    
    return res.status(201).json({ message: 'AUCTION_ITEM_CREATED', item: saved._id });
  } catch (error) {
    logger.error('CREATE AUCTION ITEM ERROR:', error);
    return res.status(500).json({ message: 'INTERNAL_SERVER_ERROR' });
  }
};

const getAllAuctions = async (req, res) => {
  try {
    const auctionItems = await AuctionItem.find({}).populate('sellerId', 'email').sort({ createdAt: -1 });
    logger.info('Retrieved auction items:', auctionItems.length);
    
    const itemsWithImageUrls = auctionItems.map(item => {
      const itemObj = item.toObject();
      if (itemObj.images && itemObj.images.length > 0) {
        itemObj.imageUrl = `data:${itemObj.images[0].contentType};base64,${itemObj.images[0].data.toString('base64')}`;
      }
      
      if (itemObj.sellerId && itemObj.sellerId.email) {
        itemObj.sellerEmail = itemObj.sellerId.email;
      }
      
      if (itemObj.sellerReviews && itemObj.sellerReviews.length > 0) {
        const totalRating = itemObj.sellerReviews.reduce((sum, review) => sum + review.rating, 0);
        itemObj.averageSellerRating = (totalRating / itemObj.sellerReviews.length).toFixed(1);
        itemObj.totalSellerReviews = itemObj.sellerReviews.length;
      } else {
        itemObj.averageSellerRating = 0;
        itemObj.totalSellerReviews = 0;
      }
      
      itemObj.currentBid = itemObj.currentBid || itemObj.currentHighestBid || itemObj.startingPrice;
      itemObj.currentBidder = itemObj.currentBidder || '';
      itemObj.hasActiveBids = itemObj.totalBids > 0;
      
      return itemObj;
    });
    return res.status(200).json(itemsWithImageUrls);
  } catch (error) {
    logger.error('GET AUCTION ITEMS ERROR:', error);
    return res.status(500).json({ message: 'INTERNAL_SERVER_ERROR' });
  }
};

const addReview = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { reviewerName, rating, comment } = req.body;

    if (!reviewerName || !rating || !comment) {
      return res.status(400).json({ message: 'MISSING_REQUIRED_FIELDS' });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'RATING_MUST_BE_BETWEEN_1_AND_5' });
    }

    const auctionItem = await AuctionItem.findById(itemId);
    if (!auctionItem) {
      return res.status(404).json({ message: 'AUCTION_ITEM_NOT_FOUND' });
    }

    auctionItem.sellerReviews.push({
      reviewerName,
      rating,
      comment
    });

    await auctionItem.save();
    return res.status(200).json({ message: 'REVIEW_ADDED_SUCCESSFULLY' });
  } catch (error) {
    logger.error('ADD SELLER REVIEW ERROR:', error);
    return res.status(500).json({ message: 'INTERNAL_SERVER_ERROR' });
  }
};

const getReviews = async (req, res) => {
  try {
    const { itemId } = req.params;
    const auctionItem = await AuctionItem.findById(itemId);
    
    if (!auctionItem) {
      return res.status(404).json({ message: 'AUCTION_ITEM_NOT_FOUND' });
    }

    return res.status(200).json({
      sellerName: auctionItem.sellerName,
      reviews: auctionItem.sellerReviews,
      averageRating: auctionItem.sellerReviews.length > 0 
        ? (auctionItem.sellerReviews.reduce((sum, review) => sum + review.rating, 0) / auctionItem.sellerReviews.length).toFixed(1)
        : 0
    });
  } catch (error) {
    logger.error('GET SELLER REVIEWS ERROR:', error);
    return res.status(500).json({ message: 'INTERNAL_SERVER_ERROR' });
  }
};

const getImage = async (req, res) => {
  try {
    const { id, imageIndex } = req.params;
    const auctionItem = await AuctionItem.findById(id);
    
    if (!auctionItem || !auctionItem.images || !auctionItem.images[imageIndex]) {
      return res.status(404).json({ message: 'Image not found' });
    }
    
    const image = auctionItem.images[imageIndex];
    res.set('Content-Type', image.contentType);
    res.set('Content-Length', image.size);
    res.send(image.data);
  } catch (error) {
    logger.error('GET AUCTION ITEM IMAGE ERROR:', error);
    return res.status(500).json({ message: 'INTERNAL_SERVER_ERROR' });
  }
};

const getSoldItems = async (req, res) => {
  try {
    const { userId } = req.params;
    const soldItems = await AuctionItem.find({ 
      sellerId: userId, 
      endDate: { $lt: new Date() } 
    }).sort({ endDate: -1 });
    
    const itemsWithImageUrls = soldItems.map(item => {
      const itemObj = item.toObject();
      if (itemObj.images && itemObj.images.length > 0) {
        itemObj.imageUrl = `data:${itemObj.images[0].contentType};base64,${itemObj.images[0].data.toString('base64')}`;
      }
      return itemObj;
    });
    
    return res.status(200).json(itemsWithImageUrls);
  } catch (error) {
    logger.error('GET USER SOLD ITEMS ERROR:', error);
    return res.status(500).json({ message: 'INTERNAL_SERVER_ERROR' });
  }
};

const getWonItems = async (req, res) => {
  try {
    const { userId } = req.params;
    const wonItems = await AuctionItem.find({ 
      endDate: { $lt: new Date() } 
    }).sort({ endDate: -1 });
    
    const itemsWithImageUrls = wonItems.map(item => {
      const itemObj = item.toObject();
      if (itemObj.images && itemObj.images.length > 0) {
        itemObj.imageUrl = `data:${itemObj.images[0].contentType};base64,${itemObj.images[0].data.toString('base64')}`;
      }
      return itemObj;
    });
    
    return res.status(200).json(itemsWithImageUrls);
  } catch (error) {
    logger.error('GET USER WON ITEMS ERROR:', error);
    return res.status(500).json({ message: 'INTERNAL_SERVER_ERROR' });
  }
};

const getActiveAuctions = async (req, res) => {
  try {
    const { userId } = req.params;
    const currentDate = new Date();
    const activeItems = await AuctionItem.find({ 
      sellerId: userId, 
      startDate: { $lte: currentDate },
      endDate: { $gte: currentDate }
    }).sort({ endDate: 1 });
    
    const itemsWithImageUrls = activeItems.map(item => {
      const itemObj = item.toObject();
      if (itemObj.images && itemObj.images.length > 0) {
        itemObj.imageUrl = `data:${itemObj.images[0].contentType};base64,${itemObj.images[0].data.toString('base64')}`;
      }
      return itemObj;
    });
    
    return res.status(200).json(itemsWithImageUrls);
  } catch (error) {
    logger.error('GET USER ACTIVE AUCTIONS ERROR:', error);
    return res.status(500).json({ message: 'INTERNAL_SERVER_ERROR' });
  }
};

const getBidHistory = async (req, res) => {
  try {
    const { auctionId } = req.params;
    const bids = await Bid.find({ auctionId })
      .sort({ timestamp: -1 })
      .limit(50);
    
    return res.status(200).json(bids);
  } catch (error) {
    logger.error('GET BID HISTORY ERROR:', error);
    return res.status(500).json({ message: 'INTERNAL_SERVER_ERROR' });
  }
};

const getAuctionStatus = async (req, res) => {
  try {
    const { auctionId } = req.params;
    const auction = await AuctionItem.findById(auctionId);
    
    if (!auction) {
      return res.status(404).json({ message: 'AUCTION_NOT_FOUND' });
    }

    const now = new Date();
    const timeLeft = Math.max(0, new Date(auction.endDate).getTime() - now.getTime());
    
    return res.status(200).json({
      auctionId,
      isActive: auction.isActive && timeLeft > 0,
      currentHighestBid: auction.currentHighestBid,
      currentWinnerName: auction.currentWinnerName,
      totalBids: auction.totalBids,
      timeLeft: Math.ceil(timeLeft / 1000),
      timeLeftFormatted: formatTimeLeft(timeLeft),
      isSold: auction.isSold
    });
  } catch (error) {
    logger.error('GET AUCTION STATUS ERROR:', error);
    return res.status(500).json({ message: 'INTERNAL_SERVER_ERROR' });
  }
};

const startAuctionTimer = (auction) => {
  const auctionId = auction._id.toString();
  
  if (auctionTimers.has(auctionId)) {
    clearInterval(auctionTimers.get(auctionId));
  }

  const endTime = new Date(auction.endDate).getTime();
  
  const timer = setInterval(async () => {
    const now = Date.now();
    const timeLeft = endTime - now;
    
    if (timeLeft <= 0) {
      clearInterval(timer);
      auctionTimers.delete(auctionId);
      
      try {
        const updatedAuction = await AuctionItem.findByIdAndUpdate(
          auctionId,
          { 
            isActive: false,
            isSold: auction.currentWinnerId ? true : false
          },
          { new: true }
        );

        logger.info(`Auction ${auctionId} ended. Winner: ${updatedAuction.currentWinnerName || 'No winner'}`);
      } catch (error) {
        logger.error('Error ending auction:', error);
      }
    }
  }, 1000);

  auctionTimers.set(auctionId, timer);
};

const initializeAuctionTimers = async () => {
  try {
    const activeAuctions = await AuctionItem.find({
      isActive: true,
      endDate: { $gt: new Date() }
    });

    activeAuctions.forEach(auction => {
      startAuctionTimer(auction);
    });

    logger.info(`Initialized timers for ${activeAuctions.length} active auctions`);
  } catch (error) {
    logger.error('Error initializing auction timers:', error);
  }
};

module.exports = { 
    signup, login, 
    createAuction, 
    getAllAuctions, 
    addReview, 
    getReviews, 
    getImage,
    getSoldItems,
    getWonItems,
    getActiveAuctions,
    getBidHistory,
    getAuctionStatus,
    initializeAuctionTimers,
    auctionTimers
};
