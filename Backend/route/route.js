const express = require('express');
const multer = require('multer');
const {signup, login, createAuction, getAllAuctions, addReview, getReviews, getImage, getSoldItems, getWonItems, getActiveAuctions, getBidHistory, getAuctionStatus} = require('../controller/controller');

const router = express.Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024, files: 10 },
});


router.post('/signup', signup);
router.post('/login', login);
router.post('/auctionitems', upload.array('images', 10), createAuction);
router.get('/auctionitems', getAllAuctions);
router.post('/auctionitems/:itemId/reviews', addReview);
router.get('/auctionitems/:itemId/reviews', getReviews);
router.get('/auctionitems/:id/image/:imageIndex', getImage);
router.get('/user/:userId/sold-items', getSoldItems);
router.get('/user/:userId/won-items', getWonItems);
router.get('/user/:userId/active-auctions', getActiveAuctions);
router.get('/auctionitems/:auctionId/bids', getBidHistory);
router.get('/auctionitems/:auctionId/status', getAuctionStatus);

module.exports = router;