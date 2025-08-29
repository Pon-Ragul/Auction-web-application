import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faTimes } from '@fortawesome/free-solid-svg-icons';
import './Notification.css';

const Notification = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const notificationRef = useRef(null);

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
                    className={`notification-item ${!notification.isRead ? 'unread' : ''}`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="notification-message">
                      {notification.message}
                    </div>
                    <div className="notification-time">
                      {notification.time}
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