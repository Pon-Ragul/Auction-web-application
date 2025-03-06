import React from "react";
import "./UserProfile.css";
import Header from "./Header";
import {
  FaInstagram, FaLinkedin
} from 'react-icons/fa';
import { Envelope } from "react-bootstrap-icons";
export default function Profile() {
  return (
    <>
      <Header />
      <div className="profile-container">
        <div className="user-info">
          <img
            src="profile.jpg"
            alt="Profile"
            className="profile-pic"
          />
          <h1 className="name">User</h1>
          <p className="email"><Envelope color="black" size={30} />@usermail</p>
          <p className="bio">Passionate bidder and collector.</p>
          <p className="insta"><FaInstagram color="black" size={30} />User_Instagram</p>
          <p className="linkedin"><FaLinkedin color="black" size={30} />User_LinkedIn</p>
        </div>
        <div className="account-stats">
          <div className="stat">
            <h3>10</h3>
            <p>Auctions Created</p>
          </div>
          <div className="stat">
            <h3>25</h3>
            <p>Bids Placed</p>
          </div>
          <div className="stat">
            <h3>5</h3>
            <p>Auctions Won</p>
          </div>
        </div>

        <div className="my-auction">
          <h3>My Auctions</h3>
          <ul className="auction-datas">
            <li>Active: 2</li>
            <li>Completed: 8</li>
            <li>Unsold: 3</li>
          </ul>
        </div>
        <div className="bidding-history">
          <h3>Bidding History</h3>
          <ul className="auction-datas">
            <li>Ongoing Bids: 4</li>
            <li>Past Bids: 21</li>
            <li>Won Auctions: 5</li>
          </ul>
        </div>

        <div className="account-settings">
          <button>Edit Profile</button>
        </div>
      </div>
    </>
  );
};
