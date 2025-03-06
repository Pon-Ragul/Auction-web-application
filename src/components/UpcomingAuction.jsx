import React from "react";
export default function UpcomingAuction({ auctions }) {
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
                                <button className="Info-button-upcoming"><p className="auction-button-text">About the Auction</p></button>
                            </div>
                        ))
                    ) : (
                        <h3 className="no-upcomingauction">No upcoming auctions available.</h3>
                    )}
                </div>
            </div>
        </>
    )
}