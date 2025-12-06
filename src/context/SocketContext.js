import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from './AuthContext';

const SocketContext = createContext();

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const [auctionData, setAuctionData] = useState({});
  const [auctionTimers, setAuctionTimers] = useState({});
  const { user } = useAuth();

  useEffect(() => {
    // Initialize socket connection
    const newSocket = io('http://localhost:3001', {
      transports: ['websocket', 'polling'],
      timeout: 20000,
      forceNew: true
    });

    newSocket.on('connect', () => {
      console.log('Connected to WebSocket server');
      setConnected(true);
    });

    newSocket.on('disconnect', (reason) => {
      console.log('Disconnected from WebSocket server:', reason);
      setConnected(false);
    });

    newSocket.on('connect_error', (error) => {
      console.error('WebSocket connection error:', error);
      setConnected(false);
    });

    newSocket.on('reconnect', (attemptNumber) => {
      console.log('Reconnected to WebSocket server after', attemptNumber, 'attempts');
      setConnected(true);
    });

    newSocket.on('reconnect_error', (error) => {
      console.error('WebSocket reconnection error:', error);
    });

    // Handle bid updates
    newSocket.on('bid_update', (data) => {
      console.log('Received bid update:', data);
      setAuctionData(prev => ({
        ...prev,
        [data.auctionId]: {
          ...prev[data.auctionId],
          currentHighestBid: data.currentHighestBid,
          currentWinnerName: data.currentWinnerName,
          totalBids: data.totalBids,
          lastBidTime: data.timestamp
        }
      }));
    });

    // Handle time updates
    newSocket.on('time_update', (data) => {
      setAuctionTimers(prev => ({
        ...prev,
        [data.auctionId]: {
          timeLeft: data.timeLeft,
          timeLeftFormatted: data.timeLeftFormatted
        }
      }));
    });

    // Handle auction ended
    newSocket.on('auction_ended', (data) => {
      console.log('Auction ended:', data);
      setAuctionData(prev => ({
        ...prev,
        [data.auctionId]: {
          ...prev[data.auctionId],
          ended: true,
          winner: data.winner,
          finalBid: data.finalBid,
          isSold: data.isSold
        }
      }));
      
      // Remove timer for ended auction
      setAuctionTimers(prev => {
        const newTimers = { ...prev };
        delete newTimers[data.auctionId];
        return newTimers;
      });
    });

    // Handle bid success
    newSocket.on('bid_success', (data) => {
      console.log('Bid placed successfully:', data);
    });

    // Handle bid errors
    newSocket.on('bid_error', (error) => {
      console.error('Bid error:', error);
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  const joinAuction = (auctionId) => {
    if (socket && connected) {
      socket.emit('join_auction', auctionId);
      console.log(`Joined auction: ${auctionId}`);
    }
  };

  const leaveAuction = (auctionId) => {
    if (socket && connected) {
      socket.emit('leave_auction', auctionId);
      console.log(`Left auction: ${auctionId}`);
    }
  };

  const placeBid = (auctionId, bidAmount) => {
    return new Promise((resolve, reject) => {
      if (!socket || !connected) {
        reject(new Error('Not connected to server'));
        return;
      }

      if (!user || !user._id) {
        reject(new Error('User not authenticated'));
        return;
      }

      const bidData = {
        auctionId,
        bidderId: user._id,
        bidderName: user.name,
        bidAmount: parseFloat(bidAmount)
      };

      // Set up one-time listeners for this bid
      const onBidSuccess = (data) => {
        socket.off('bid_success', onBidSuccess);
        socket.off('bid_error', onBidError);
        resolve(data);
      };

      const onBidError = (error) => {
        socket.off('bid_success', onBidSuccess);
        socket.off('bid_error', onBidError);
        reject(new Error(error.message || 'Failed to place bid'));
      };

      socket.on('bid_success', onBidSuccess);
      socket.on('bid_error', onBidError);

      // Emit the bid
      socket.emit('place_bid', bidData);

      // Set a timeout to prevent hanging
      setTimeout(() => {
        socket.off('bid_success', onBidSuccess);
        socket.off('bid_error', onBidError);
        reject(new Error('Bid timeout'));
      }, 10000);
    });
  };

  const getAuctionData = (auctionId) => {
    return auctionData[auctionId] || {};
  };

  const getAuctionTimer = (auctionId) => {
    return auctionTimers[auctionId] || {};
  };

  const value = {
    socket,
    connected,
    joinAuction,
    leaveAuction,
    placeBid,
    getAuctionData,
    getAuctionTimer,
    auctionData,
    auctionTimers
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};
