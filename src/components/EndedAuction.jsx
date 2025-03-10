import React, { useState } from "react";

export default function EndedAuction({ auctions }){
     const [infoPopup, setInfoPopup] = useState(null);
        const handleInfoClick = (auction) => {
            setInfoPopup(auction);
        };
        const handleCloseInfoPopup = () => {
            setInfoPopup(null);
        };
    return(
        <>
        <h2 className="Endedheading"><center>Ended Auctions</center></h2>
        <div className="Endedauction">
            <div className="LiveAuction">
                {auctions.length > 0 ? (
                    auctions.map((auction) => (
                        <div key={auction.id} className="Auction-Items">
                            <img src={auction.image} alt={auction.name} className="Auction-Items-Img" />
                            <div className="Item-name">
                                <h5>{auction.name}</h5>
                                <p>MRP: ₹{auction.mrp.toFixed(2)}</p>
                                <p>Auction Ended on: {auction.endDate}</p>
                                <button className="Info-button-ended"  onClick={() => handleInfoClick(auction)}><p className="auction-button-text">About the Auction</p></button>
                            </div>
                        </div>
                    ))
                ):(
                    <h3 className="no-endedauction">No auctions have ended yet.</h3>
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
                                <div className="popup-review-section">
                                    <h5>Seller Review:</h5>
                                    <div className="popup-review-text">
                                        <p>The product is in great condition, thoroughly inspected to ensure quality and durability. It has been well-maintained, with no major signs of wear and tear. All functions work perfectly, and it has been cleaned and tested for optimal performance. A reliable choice for anyone looking for a high-quality product at a reasonable price!</p>
                                    </div>
                                </div>
                                <div className="popup-contact">
                                    <h6>Contact: seller@gmail.com</h6>
                                    <h6>Ended on: {infoPopup.endDate}</h6>
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