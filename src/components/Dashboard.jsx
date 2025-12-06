import React, { useState, useEffect } from "react";
import "./UserProfile.css";
import HeaderWrapper from "./HeaderWrapper";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import {
  FaTrophy, FaTag, FaClock
} from 'react-icons/fa';
import { Envelope } from "react-bootstrap-icons";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [soldItems, setSoldItems] = useState([]);
  const [wonItems, setWonItems] = useState([]);
  const [activeAuctions, setActiveAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [profileImage, setProfileImage] = useState("/profile.jpg");
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (user && user._id) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      
      // Fetch sold items
      const soldResponse = await axios.get(`http://localhost:3001/user/${user._id}/sold-items`);
      setSoldItems(soldResponse.data);
      
      // Fetch won items (simulated for now)
      const wonResponse = await axios.get(`http://localhost:3001/user/${user._id}/won-items`);
      setWonItems(wonResponse.data.slice(0, 3)); // Simulate won items by taking first 3
      
      // Fetch active auctions
      const activeResponse = await axios.get(`http://localhost:3001/user/${user._id}/active-auctions`);
      setActiveAuctions(activeResponse.data);
      
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
  };

  const handleEditProfile = () => {
    setShowEditProfile(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    // Here you would typically upload the image to your server
    // For now, we'll just update the local state
    if (selectedImage) {
      // In a real app, you'd upload the image and get a URL back
      console.log('Profile image updated:', selectedImage.name);
    }
    setShowEditProfile(false);
    setSelectedImage(null);
  };

  const handleCancelEdit = () => {
    setShowEditProfile(false);
    setSelectedImage(null);
    setProfileImage("/profile.jpg"); // Reset to default
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const calculateDaysLeft = (endDate) => {
    const today = new Date();
    const end = new Date(endDate);
    const daysLeft = Math.max(0, Math.ceil((end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));
    return daysLeft;
  };

  if (loading) {
    return (
      <>
        <HeaderWrapper />
        <div className="dashboard-container">
          <div className="loading">Loading your dashboard...</div>
        </div>
      </>
    );
  }

  return (
    <>
      <HeaderWrapper />
      <div className="dashboard-container">
        {/* User Profile Section */}
        <div className="user-profile-section">
          <div className="user-info">
            <img
              src={profileImage}
              alt="Profile"
              className="profile-pic"
            />
            <div className="user-details">
              <h1 className="name">{user?.name || user?.user?.name || "User"}</h1>
              <p className="email">
                <Envelope color="#666" size={20} />
                <span>{user?.email || user?.user?.email || "user@example.com"}</span>
              </p>
              <p className="bio">Passionate bidder and collector.</p>
            </div>
            <div className="user-stats">
              <div className="stat">
                <h3>{soldItems.length + activeAuctions.length}</h3>
                <p>Auctions Created</p>   
              </div>
              <div className="stat">
                <h3>{wonItems.length}</h3>
                <p>Auctions Won</p>
              </div>
              <div className="stat">
                <h3>{activeAuctions.length}</h3>
                <p>Active Auctions</p>
              </div>
            </div>
            <div className="account-settings">
              <button className="btn-primary" onClick={handleEditProfile}>Edit Profile</button>
              <button onClick={handleLogout} className="btn-danger">Logout</button>
            </div>
          </div>
        </div>

        {/* Items Sold Section */}
        <div className="items-sold-section">
          <h2 className="section-title"><FaTag /> Items Sold</h2>
          <div className="items-grid">
            {soldItems.length > 0 ? (
              soldItems.map((item) => (
                <div key={item._id} className="item-card">
                  <img 
                    src={item.imageUrl || "/pixelcutt.jpg"} 
                    alt={item.itemName}
                    className="item-image"
                  />
                  <div className="item-details">
                    <h4>{item.itemName}</h4>
                    <p className="item-category">{item.category}</p>
                    <p className="item-date">
                      <FaClock size={14} />
                      Started: {formatDate(item.startDate)}
                    </p>
                    <p className="item-date">
                      Ended: {formatDate(item.endDate)}
                    </p>
                    <div className="item-price">
                      <span className="starting-price">Starting: ₹{item.startingPrice}</span>
                      <span className="final-price">
                        {/* Simulate final bid - in real app, you'd get this from bids */}
                        Final: ₹{Math.floor(item.startingPrice * (1.2 + Math.random() * 0.8))}
                      </span>
                    </div>
                    <div className={`item-status ${calculateDaysLeft(item.endDate) === 0 ? 'sold' : 'unsold'}`}>
                      {calculateDaysLeft(item.endDate) === 0 ? 'Sold' : 'Unsold'}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-items">
                <p>You haven't sold any items yet.</p>
              </div>
            )}
          </div>
        </div>

        {/* Items Won Section */}
        <div className="items-won-section">
          <h2 className="section-title"><FaTrophy /> Items Won</h2>
          <div className="items-grid">
            {wonItems.length > 0 ? (
              wonItems.map((item) => (
                <div key={item._id} className="item-card">
                  <img 
                    src={item.imageUrl || "/pixelcutt.jpg"} 
                    alt={item.itemName}
                    className="item-image"
                  />
                  <div className="item-details">
                    <h4>{item.itemName}</h4>
                    <p className="item-category">{item.category}</p>
                    <p className="item-date">
                      <FaClock size={14} />
                      Ended: {formatDate(item.endDate)}
                    </p>
                    <div className="item-price">
                      <span className="winning-bid">
                        Winning Bid: ₹{Math.floor(item.startingPrice * (1.3 + Math.random() * 0.7))}
                      </span>
                    </div>
                    <div className="item-status won">
                      Won
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-items">
                <p>You haven't won any auctions yet.</p>
              </div>
            )}
          </div>
        </div>

        {/* Active Auctions Section */}
        {activeAuctions.length > 0 && (
          <div className="active-auctions-section">
            <h2 className="section-title"><FaClock /> Active Auctions</h2>
            <div className="items-grid">
              {activeAuctions.map((item) => (
                <div key={item._id} className="item-card">
                  <img 
                    src={item.imageUrl || "/pixelcutt.jpg"} 
                    alt={item.itemName}
                    className="item-image"
                  />
                  <div className="item-details">
                    <h4>{item.itemName}</h4>
                    <p className="item-category">{item.category}</p>
                    <p className="item-date">
                      <FaClock size={14} />
                      Ends: {formatDate(item.endDate)}
                    </p>
                    <div className="item-price">
                      <span className="starting-price">Starting: ₹{item.startingPrice}</span>
                    </div>
                    <div className="item-status active">
                      {calculateDaysLeft(item.endDate)} days left
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Edit Profile Modal */}
        {showEditProfile && (
          <div className="edit-profile-modal">
            <div className="edit-profile-content">
              <h3>Edit Profile Picture</h3>
              <div className="profile-preview">
                <img
                  src={profileImage}
                  alt="Profile Preview"
                  className="profile-pic-preview"
                />
              </div>
              <div className="image-upload">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  id="profile-image-input"
                  className="file-input"
                />
                <label htmlFor="profile-image-input" className="file-input-label">
                  Choose New Image
                </label>
              </div>
              <div className="edit-profile-buttons">
                <button onClick={handleSaveProfile} className="btn-primary">
                  Save Changes
                </button>
                <button onClick={handleCancelEdit} className="btn-danger">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
