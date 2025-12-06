import React, { useState } from "react";
export default function UpcomingAuction({ auctions }) {
    const [infoPopup, setInfoPopup] = useState(null);
    const handleInfoClick = (auction) => {
        setInfoPopup(auction);
    };
    const handleCloseInfoPopup = () => {
        setInfoPopup(null);
    };
    return (
        <>
            <h2 className="Upcomingheading"><center>Upcoming Auctions</center></h2>
            <div className="Upcomingcontainer">
                <div className="LiveAuction">
                    {auctions.length > 0 ? (
                        auctions.map((auction) => (
                            <div key={auction.id} className="Auction-Items">
                                <img src={auction.image} alt={auction.name} className="Auction-Items-Img" />
                                <div className="Item-name">
                                    <h5>{auction.name}</h5>
                                    <p>MRP: ₹{auction.mrp.toFixed(2)}</p>
                                    <p>Starts on: {auction.startDate}</p>
                                </div>
                                <button className="Info-button-upcoming" onClick={() => handleInfoClick(auction)}><p className="auction-button-text">About the Auction</p></button>
                            </div>
                        ))
                    ) : (
                        <h3 className="no-upcomingauction">No upcoming auctions available.</h3>
                    )}
                </div>
            </div>
            {infoPopup && (
                <div className="popup-overlay">
                    <div className="popup-container">
                        <h3 className="popup-header">Product Info</h3>
                        <div className="popup-content">
                            <img src={infoPopup.image} alt={infoPopup.name} className="popup-image" />
                            <div className="popup-details">
                                <h4 className="popup-title">{infoPopup.name}</h4>
                                <p className="popup-category">Category: {infoPopup.category}</p>
                                <h5>Description:</h5>
                                <div className="popup-review-section">
                                    <div className="popup-review-text">
                                        <p>{infoPopup.description || "No description available for this item."}</p>
                                    </div>
                                </div>
                                <div className="popup-contact">
                                    <h6>Contact: {infoPopup.sellerEmail || "seller@gmail.com"}</h6>
                                    <h6>Starts on: {infoPopup.startDate}</h6>
                                    <h6>Base Price: ₹{infoPopup.basePrice}</h6>
                                </div>
                            </div>
                        </div>
                        <button onClick={handleCloseInfoPopup} className="popup-close-button">Close</button>
                    </div>
                </div>
            )}
        </>
    )
}