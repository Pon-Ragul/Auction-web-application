import React, { useState } from "react";
import "./Bid.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

export default function LiveAuction({ auctions }) {
    const [selectedAuction, setSelectedAuction] = useState(null);
    const [bidAmount, setBidAmount] = useState("");
    const [bids, setBids] = useState({});
    const [infoPopup, setInfoPopup] = useState(null);

    const handleBidClick = (auction) => {
        setSelectedAuction(auction);
        setBidAmount("");
    };

    const handleInfoClick = (auction) => {
        setInfoPopup(auction);
    };

    const handleClosePopup = () => {
        setSelectedAuction(null);
        setBidAmount("");
    };

    const handleCloseInfoPopup = () => {
        setInfoPopup(null);
    };

    const handleBidSubmit = () => {
        const currentBid = bids[selectedAuction.id] || selectedAuction.basePrice;
        const enteredBid = parseFloat(bidAmount);

        if (enteredBid > currentBid) {
            setBids((prevBids) => ({ ...prevBids, [selectedAuction.id]: enteredBid }));
            handleClosePopup();
        } else {
            alert(`Your bid must be greater than ₹${currentBid}`);
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
                                    <button className="Info-button" onClick={() => handleInfoClick(auction)}>
                                        <FontAwesomeIcon icon={faInfoCircle} className="info-icon" />
                                    </button>
                                    <button className="Bid-button" onClick={() => handleBidClick(auction)}>
                                        <p className="auction-button-text">
                                            {bids[auction.id] ? `Current Bid: ₹${bids[auction.id]}` : `Base Price: ₹${auction.basePrice}`}
                                        </p>
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
                <div className="popup-overlay-bid">
                    <div className="popup-container-bid">
                        <h3 className="popup-text">Place Your Bid</h3>
                        <p className="popup-text">Current Bid: ₹{bids[selectedAuction.id] || selectedAuction.basePrice}</p>
                        <input type="number" value={bidAmount} onChange={(e) => setBidAmount(e.target.value)} placeholder="Enter your bid" className="popup-input" />
                        <div className="popup-buttons">
                            <button onClick={handleBidSubmit} className="submit-bid">Submit Bid</button>
                            <button onClick={handleClosePopup} className="close-popup">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
            {infoPopup && (
                <div className="popup-overlay">
                    <div className="popup-container">
                        <h3 className="popup-header">Product Info</h3>
                        <div className="popup-content">
                            <img src={infoPopup.image} alt={infoPopup.name} className="popup-image" />
                            <div className="popup-details">
                                <h4 className="popup-title">{infoPopup.name}</h4>
                                <div className="popup-review-section">
                                    <h5>Seller Review:</h5>
                                    <div className="popup-review-text">
                                        <p>The product is in great condition, thoroughly inspected to ensure quality and durability. It has been well-maintained, with no major signs of wear and tear. All functions work perfectly, and it has been cleaned and tested for optimal performance. A reliable choice for anyone looking for a high-quality product at a reasonable price!</p>
                                    </div>
                                </div>
                                <div className="popup-contact">
                                    <h6>Contact: seller@gmail.com</h6>
                                    <h6>Ends on: {infoPopup.endDate}</h6>
                                </div>
                            </div>
                        </div>
                        <button onClick={handleCloseInfoPopup} className="popup-close-button">Close</button>
                    </div>
                </div>
            )}


        </>
    );
}