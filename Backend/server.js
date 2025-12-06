const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { Server } = require('socket.io');
const http = require('http');


const { logger, placeBid } = require('./util/util.js');
const { initializeAuctionTimers } = require('./controller/controller.js');

const route = require('./Route/route.js');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/bidcraze")
  .then(() => logger.info("MongoDB connected"))
  .catch((err) => logger.error(err));

app.use('/api/auth', route);
app.use('/', route);

io.on('connection', (socket) => {
  logger.info('User connected:', socket.id);

  socket.on('join_auction', (auctionId) => {
    socket.join(`auction_${auctionId}`);
    logger.info(`User ${socket.id} joined auction ${auctionId}`);
  });

  socket.on('leave_auction', (auctionId) => {
    socket.leave(`auction_${auctionId}`);
    logger.info(`User ${socket.id} left auction ${auctionId}`);
  });

  socket.on('place_bid', (bidData) => {
    placeBid(socket, bidData, io);
  });

  socket.on('disconnect', () => {
    logger.info('User disconnected:', socket.id);
  });
});

mongoose.connection.once('open', () => {
  initializeAuctionTimers();
});

server.listen(3001, () => {
  logger.info("Server running on http://localhost:3001");
});