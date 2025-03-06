import React from "react";

export default function EndedAuction({ auctions }){
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
                                <button className="Info-button-ended"><p className="auction-button-text">About the Auction</p></button>
                            </div>
                        </div>
                    ))
                ):(
                    <h3 className="no-endedauction">No auctions have ended yet.</h3>
                )}
            </div>
        </div>
        </>
    )
}