import React, { useState } from "react";
import "./Bid.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

export default function LiveAuction({ auctions }) {
    const [selectedAuction, setSelectedAuction] = useState(null);
    const [bidAmount, setBidAmount] = useState("");
    const [bids, setBids] = useState({});

    const handleBidClick = (auction) => {
        setSelectedAuction(auction);
        setBidAmount(bids[auction.id] || "");
    };

    const handleClosePopup = () => {
        setSelectedAuction(null);
        setBidAmount("");
    };

    const handleBidSubmit = () => {
        if (bidAmount && parseFloat(bidAmount) >= selectedAuction.basePrice) {
            setBids((prevBids) => ({ ...prevBids, [selectedAuction.id]: parseFloat(bidAmount) }));
            handleClosePopup();
        } else {
            alert("Please enter a valid bid amount above the base price.");
        }
    };

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
                                    <button className="Info-button">
                                        <FontAwesomeIcon icon={faInfoCircle} className="info-icon" />
                                    </button>
                                    <button className="Bid-button" onClick={() => handleBidClick(auction)}>
                                        <p className="auction-button-text"> {bids[auction.id] ? `Current Bid: ₹${bids[auction.id]}` : `Base Price: ₹${auction.basePrice}`}</p>
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <h3 className="no-liveauction">No live auctions available.</h3>
                    )}
                </div>
            </div>
            {selectedAuction && (
                <div className="popup-overlay">
                    <div className="popup-container">
                        <h3 className="popup-text">Place Your Bid</h3>
                        <p className="popup-text">Current Base Price: ₹{selectedAuction.basePrice}</p>
                        <input type="number" value={bidAmount} onChange={(e) => setBidAmount(e.target.value)} placeholder="Enter your bid" className="popup-input" />
                        <div className="popup-buttons">
                            <button onClick={handleBidSubmit} className="submit-bid">Submit Bid</button>
                            <button onClick={handleClosePopup} className="close-popup">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
