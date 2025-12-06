import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useSocket } from '../context/SocketContext';
import { useAuth } from '../context/AuthContext';
import './Notification.css';

const Notification = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const { socket, connected } = useSocket();
  const { user } = useAuth();

  const notificationRef = useRef(null);

  // Listen for notifications from socket
  useEffect(() => {
    if (socket && connected && user) {
      const handleNotification = (notificationData) => {
        const newNotification = {
          id: Date.now() + Math.random(),
          message: notificationData.message,
          time: new Date().toLocaleString(),
          isRead: false,
          type: notificationData.type
        };
        
        setNotifications(prev => [newNotification, ...prev]);
      };

      socket.on('auction_notification', handleNotification);

      return () => {
        socket.off('auction_notification', handleNotification);
      };
    }
  }, [socket, connected, user]);

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleNotification = () => {
    setIsOpen(!isOpen);
  };

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const deleteNotification = (id, event) => {
    event.stopPropagation(); // Prevent marking as read when deleting
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const unreadCount = notifications.filter(notification => !notification.isRead).length;

  return (
    <div className="notification-container" ref={notificationRef}>
      <button 
        className="notification-button" 
        onClick={toggleNotification}
      >
        <FontAwesomeIcon icon={faBell} className="nav-icon"/>Notifications
        {unreadCount > 0 && (
          <span className="notification-badge">{unreadCount}</span>
        )}
      </button>

      {isOpen && (
        <div className="notification-popup">
          <div className="notification-header">
            <h3>Notifications</h3>
            <button 
              className="close-button"
              onClick={() => setIsOpen(false)}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
          
          <div className="notification-content">
            {notifications.length === 0 ? (
              <div className="no-notifications">
                <p>No notifications</p>
                <span>You're all caught up!</span>
              </div>
            ) : (
              <div className="notifications-list">
                {notifications.map((notification) => (
                  <div 
                    key={notification.id} 
                    className={`notification-item ${!notification.isRead ? 'unread' : ''} ${notification.type || ''}`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="notification-content">
                      <div className="notification-message">
                        {notification.message}
                      </div>
                      <div className="notification-time">
                        {notification.time}
                      </div>
                    </div>
                    <div className="notification-actions">
                      <button 
                        className="delete-notification-btn"
                        onClick={(e) => deleteNotification(notification.id, e)}
                        title="Delete notification"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                    {!notification.isRead && (
                      <div className="unread-indicator"></div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification; 