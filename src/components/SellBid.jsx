import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign, faTags } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
export default function SellBid() {
    return (
        <>
            <div className="Sellbid">
                <h3 className="sellbidheading">SELL OR BID</h3>
                <div className="bid">
                    <p className="startbidding">Bid</p>
                    <FontAwesomeIcon icon={faDollarSign} className="sellbidicons" />
                    <Link to="/bid" style={{ textDecoration: 'none', color: 'inherit' }}><p>CLICK HERE TO BID</p></Link>
                    <img src="bid.png" alt="bid" className="bidimg" />
                </div>

                <div className="sell">
                    <p className="startbidding">Sell</p>
                    <FontAwesomeIcon icon={faTags} className="sellbidicons" />
                    <Link to="/sell" style={{ textDecoration: 'none', color: 'inherit' }}><p>CLICK HERE TO SELL</p></Link>
                    <img src="negotiate.png" alt="sell" className="sellimg" />
                </div>
            </div>

            <div className="rules-container">
                <h2>BidCraze's Online Auction Rules</h2>
                <hr className="line" />
                <ul className="rules-list">
                    <li>✅ One User Account Per Person / IP Address is allowed</li>
                    <li>❌ Group Bidding is strictly not allowed</li>
                    <li>⚠️ Do not use any 3rd party bidding software or bots for bidding</li>
                    <li>🚫 Misleading USER IDs are not allowed</li>
                </ul>
            </div>
        </>
    )
}