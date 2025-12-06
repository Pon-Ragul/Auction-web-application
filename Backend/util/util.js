const { AuctionItem, Bid } = require('../model/model.js');

const placeBid = async (socket, bidData, io) => {
  try {
    const { auctionId, bidderId, bidderName, bidAmount } = bidData;
    if (!auctionId || !bidderId || !bidderName || !bidAmount) {
      socket.emit('bid_error', { message: 'Missing required bid data' });
      return;
    }

    const auction = await AuctionItem.findById(auctionId);
    if (!auction) {
      socket.emit('bid_error', { message: 'Auction not found' });
      return;
    }

    logger.info('Auction data:', {
      id: auction._id,
      currentBid: auction.currentBid,
      currentHighestBid: auction.currentHighestBid,
      startingPrice: auction.startingPrice,
      currentBidder: auction.currentBidder
    });

    const now = new Date();
    if (now > auction.endDate || !auction.isActive) {
      socket.emit('bid_error', { message: 'Auction has ended' });
      return;
    }

    const minimumBid = auction.currentBid || auction.currentHighestBid || auction.startingPrice;
    logger.info('Bid validation:', {
      bidAmount,
      minimumBid,
      currentBid: auction.currentBid,
      currentHighestBid: auction.currentHighestBid,
      startingPrice: auction.startingPrice
    });
    
    if (bidAmount <= minimumBid) {
      socket.emit('bid_error', { 
        message: `Bid must be higher than ₹${minimumBid}`,
        currentHighestBid: auction.currentHighestBid,
        currentBid: minimumBid
      });
      return;
    }

    try {
      if (auction.currentWinnerId) {
        await Bid.updateMany(
          { auctionId, isWinning: true },
          { isWinning: false }
        );
      }

      const newBid = new Bid({
        auctionId,
        bidderId,
        bidderName,
        bidAmount,
        isWinning: true
      });
      await newBid.save();

      const updatedAuction = await AuctionItem.findOneAndUpdate(
        { _id: auctionId },
        {
          currentHighestBid: bidAmount,
          currentWinnerId: bidderId,
          currentWinnerName: bidderName,
          currentBid: bidAmount,
          currentBidder: bidderName,
          $inc: { totalBids: 1 }
        },
        { new: true }
      );

      logger.info('Updated auction:', {
        id: updatedAuction._id,
        currentBid: updatedAuction.currentBid,
        currentBidder: updatedAuction.currentBidder,
        totalBids: updatedAuction.totalBids
      });

      if (!updatedAuction) {
        await Bid.findByIdAndDelete(newBid._id);
        socket.emit('bid_error', { message: 'A higher bid was placed. Please try again.' });
        return;
      }

      const bidUpdate = {
        auctionId,
        currentHighestBid: bidAmount,
        currentWinnerName: bidderName,
        totalBids: updatedAuction.totalBids,
        timestamp: newBid.timestamp
      };

      io.to(`auction_${auctionId}`).emit('bid_update', bidUpdate);
      socket.emit('bid_success', { message: 'Bid placed successfully', ...bidUpdate });

    } catch (error) {
      logger.error('Bid placement error:', error);
      socket.emit('bid_error', { message: 'Failed to place bid. Please try again.' });
    }

  } catch (error) {
    logger.error('Place bid error:', error);
    socket.emit('bid_error', { message: 'Server error. Please try again.' });
  }
};


const logger = {
  info: (...args) => console.log('[INFO]', ...args),
  warn: (...args) => console.warn('[WARN]', ...args),
  error: (...args) => console.error('[ERROR]', ...args),
};

const formatTimeLeft = (milliseconds) => {
  const totalSeconds = Math.ceil(milliseconds / 1000);
  const days = Math.floor(totalSeconds / (24 * 60 * 60));
  const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = totalSeconds % 60;

  if (days > 0) {
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  } else if (hours > 0) {
    return `${hours}h ${minutes}m ${seconds}s`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds}s`;
  } else {
    return `${seconds}s`;
  }
};


module.exports = { logger, formatTimeLeft,placeBid };