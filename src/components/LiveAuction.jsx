import React from "react";
import './Bid.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faInfoCircle} from '@fortawesome/free-solid-svg-icons';
export default function LiveAuction({ auctions }) {
    return (
        <>
        <h2 className="Liveheading"><center>Live Auctions</center></h2>
        <div className="LiveContainer">
            <div className="LiveAuction">
                {auctions.length > 0 ? (
                    auctions.map((auction) => (
                        <div key={auction.id} className="Auction-Items">
                            <img src={auction.image} alt={auction.name} className="Auction-Items-Img" />
                            <div className="Item-name">
                                <h5>{auction.name}</h5>
                                <p>MRP: ₹{auction.mrp.toFixed(2)}</p>
                                <p>{`Ends in ${auction.daysLeft} days`}</p>
                            </div>
                            <div className="Info-Bid-button">
                                <button className="Info-button"><FontAwesomeIcon icon={faInfoCircle} className="info-icon"/></button>
                                <button className="Bid-button"><p className="auction-button-text">Base Price : {auction.basePrice}</p></button>
                            </div>
                        </div>
                    ))
                ) : (
                    <h3 className="no-liveauction">No live auctions available.</h3>
                )}
            </div>
        </div>
        </>
    );
}