import React from "react";
import Header from "./Header";
import Footer from "./Footer";
export default function WinningTips(){
    return(
       <>
       <Header/>
        <div className="termsandcondition">
            <p><h2 style={{fontWeight:530}} className="heading"><center>WINNING TIPS</center></h2>
            <br/><br/><h3>Do Your Research<hr className="underline"></hr></h3>Before placing a bid, read the item description thoroughly, check the seller’s reputation, and compare prices to ensure you're getting a great deal.<br/><br/>
            <h3>Set a Budget<hr className="underline"></hr></h3>Determine your maximum bid beforehand and stick to it. This helps avoid overspending in the heat of the moment.<br/><br/>
            <h3>Bid Strategically<hr className="underline"></hr></h3><ol><li>Start with a low bid to test the competition.</li>
            <li>Place your bid at the last moment (sniping) to reduce the chances of a counter-bid.</li>
            <li>Consider setting automatic bids to stay ahead without constantly monitoring the auction.</li></ol><br/><br/>
            <h3> Monitor Auctions Closely<hr className="underline"></hr></h3>Stay updated on auctions you're interested in. Enable notifications and check your bids frequently, especially as the auction nears its end.<br/><br/><br/>
            <h3>Take Advantage of Off-Peak Hours<hr className="underline"></hr></h3>Bidding when fewer users are online (late nights or early mornings) can reduce competition and increase your chances of winning.<br/><br/><br/>
            <h3> Understand Bid Increments<hr className="underline"></hr></h3>Each auction has a minimum bid increment. Make sure to account for this when placing your next bid to outbid competitors effectively.
            <br/><br/><br/>
            <h3>Be Patient and Persistent<hr className="underline"></hr></h3>If you don’t win an auction, don’t get discouraged! Keep refining your bidding strategy and try again.<br/><br/><br/>
            <h3>Check for Special Deals and Discounts<hr className="underline"></hr></h3>Stay informed about special promotions, limited-time auctions, and exclusive deals on BidCraze to maximize your savings.<br/><br/><br/>
            <h3>Contact Information<hr className="underline"></hr></h3>For questions or concerns, contact us at bidcraze@gmail.com.<br/><br/><br/>
            <p style={{fontWeight:600}}><center>Happy Bidding! 🚀</center></p>
            </p>
        </div>
        <img src="logo.png" alt="backgroundlogo" className="backgroundlogo"/>
        <Footer/>
       </>
    )
}