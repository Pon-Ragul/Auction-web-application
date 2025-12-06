import React, { useState, useEffect } from "react";
import "./Bid.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../context/AuthContext";
import { useSocket } from "../context/SocketContext";

export default function LiveAuction({ auctions }) {
    const { user } = useAuth();
    const { joinAuction, leaveAuction, placeBid, getAuctionData, connected } = useSocket();
    const [selectedAuction, setSelectedAuction] = useState(null);
    const [bidAmount, setBidAmount] = useState("");
    const [bids, setBids] = useState({});
    const [infoPopup, setInfoPopup] = useState(null);
    const [bidding, setBidding] = useState(false);

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

    // Join/leave auction rooms when auctions change
    useEffect(() => {
        if (connected && auctions.length > 0) {
            auctions.forEach(auction => {
                const auctionId = auction.id.replace('server-', '');
                joinAuction(auctionId);
            });
        }

        return () => {
            if (connected && auctions.length > 0) {
                auctions.forEach(auction => {
                    const auctionId = auction.id.replace('server-', '');
                    leaveAuction(auctionId);
                });
            }
        };
    }, [auctions, connected, joinAuction, leaveAuction]);

    // Initialize bids from auction data on component mount
    useEffect(() => {
        const initialBids = {};
        auctions.forEach(auction => {
            // Debug logging
            console.log('Auction data for', auction.name, ':', {
                currentBid: auction.currentBid,
                currentHighestBid: auction.currentHighestBid,
                basePrice: auction.basePrice,
                startingPrice: auction.startingPrice
            });
            // Always use the current bid from database if it exists, otherwise use basePrice
            initialBids[auction.id] = auction.currentBid || auction.currentHighestBid || auction.basePrice || auction.startingPrice;
        });
        console.log('Setting initial bids:', initialBids);
        setBids(initialBids);
    }, [auctions]);

    // Update bids when WebSocket data changes
    useEffect(() => {
        const updatedBids = {};
        auctions.forEach(auction => {
            const auctionId = auction.id.replace('server-', '');
            const auctionData = getAuctionData(auctionId);
            // Use WebSocket data if available, otherwise keep existing bid
            if (auctionData.currentHighestBid) {
                updatedBids[auction.id] = auctionData.currentHighestBid;
            }
        });
        if (Object.keys(updatedBids).length > 0) {
            setBids(prevBids => ({ ...prevBids, ...updatedBids }));
        }
    }, [getAuctionData]);

    // Helper function to get current bidder name
    const getCurrentBidderName = (auction) => {
        const auctionId = auction.id.replace('server-', '');
        const auctionData = getAuctionData(auctionId);
        return auctionData.currentWinnerName || auction.currentWinnerName || auction.currentBidder;
    };

    const handleBidSubmit = async () => {
        if (!user) {
            alert("Please login to place a bid");
            return;
        }

        const currentBid = bids[selectedAuction.id] || selectedAuction.currentBid || selectedAuction.basePrice;
        const enteredBid = parseFloat(bidAmount);

        if (isNaN(enteredBid) || enteredBid <= currentBid) {
            alert(`Your bid must be greater than ₹${currentBid}`);
            return;
        }

        setBidding(true);

        try {
            const auctionId = selectedAuction.id.replace('server-', '');
            await placeBid(auctionId, enteredBid);
            // The bid will be updated via WebSocket, so we don't need to update local state
            handleClosePopup();
        } catch (error) {
            alert(error.message || "Failed to place bid");
        } finally {
            setBidding(false);
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
                                    <p>{`Ends in ${auction.daysLeft !== undefined ? auction.daysLeft : 'calculating...'} days`}</p>
                                    <p className="current-bid-display">
                                        {bids[auction.id] ? `Current Bid: ₹${bids[auction.id]}` : `Current Bid: ₹${auction.currentBid || auction.basePrice}`}
                                    </p>
                                </div>
                                <div className="Info-Bid-button">
                                    <button className="Info-button" onClick={() => handleInfoClick(auction)}>
                                        <FontAwesomeIcon icon={faInfoCircle} className="info-icon" />
                                    </button>
                                    <button className="Bid-button" onClick={() => handleBidClick(auction)}>
                                        <p className="auction-button-text">Bid</p>
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
                        <p className="popup-text">Current Bid: ₹{bids[selectedAuction.id] || selectedAuction.currentBid || selectedAuction.basePrice}</p>
                        {getCurrentBidderName(selectedAuction) ? (
                            <p className="popup-text current-leader">Current Bid Holder: {getCurrentBidderName(selectedAuction)}</p>
                        ) : (
                            <p className="popup-text current-leader">Current Bid Holder: No bids yet</p>
                        )}
                        <input 
                            type="number" 
                            value={bidAmount} 
                            onChange={(e) => setBidAmount(e.target.value)} 
                            placeholder="Enter your bid" 
                            className="popup-input" 
                            disabled={bidding}
                        />
                        <div className="popup-buttons">
                            <button 
                                onClick={handleBidSubmit} 
                                className="submit-bid"
                                disabled={bidding}
                            >
                                {bidding ? 'Placing Bid...' : 'Submit Bid'}
                            </button>
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
                                <h5>Description:</h5>
                                <div className="popup-review-section">
                                    <div className="popup-review-text">
                                        <p>{infoPopup.description || "No description available for this item."}</p>
                                    </div>
                                </div>
                                <div className="popup-contact">
                                    <h6>Contact: {infoPopup.sellerEmail || "seller@gmail.com"}</h6>
                                    <h6>Ends on: {infoPopup.endDate}</h6>
                                    <h6>Base Price: ₹{infoPopup.basePrice}</h6>
                                    <h6>Current Bid: ₹{bids[infoPopup.id] || infoPopup.currentBid || infoPopup.basePrice}</h6>
                                    {getCurrentBidderName(infoPopup) ? (
                                        <h6>Current Bid Holder: {getCurrentBidderName(infoPopup)}</h6>
                                    ) : (
                                        <h6>Current Bid Holder: No bids yet</h6>
                                    )}
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