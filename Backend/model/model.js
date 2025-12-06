const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const BidSchema = new mongoose.Schema({
  auctionId: { type: mongoose.Schema.Types.ObjectId, ref: 'AuctionItem', required: true },
  bidderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bidderName: { type: String, required: true },
  bidAmount: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
  isWinning: { type: Boolean, default: false }
});

const SellerReviewSchema = new mongoose.Schema({
  reviewerName: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const AuctionItemSchema = new mongoose.Schema(
  {
    itemName: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    startingPrice: { type: Number, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    sellerName: { type: String, required: true },
    sellerReviews: [SellerReviewSchema],
    images: [
      new mongoose.Schema(
        {
          data: Buffer,
          contentType: String,
          fileName: String,
          size: Number,
        },
        { _id: false }
      ),
    ],
    currentHighestBid: { type: Number, default: 0 },
    currentWinnerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    currentWinnerName: { type: String },
    currentBid: { type: Number },
    currentBidder: { type: String, default: '' },
    totalBids: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    isSold: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
  },
  { collection: 'auctionitems' }
);

const User = mongoose.model("User", UserSchema);
const Bid = mongoose.model('Bid', BidSchema);
const AuctionItem = mongoose.model('AuctionItem', AuctionItemSchema);

module.exports = { User, Bid, AuctionItem, mongoose };