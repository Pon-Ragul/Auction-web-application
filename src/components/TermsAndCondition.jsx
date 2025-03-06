import React from "react";
import Header from "./Header";
import Footer from "./Footer";
export default function TermsAndConditions(){
    return(
        <>
        <Header/>
        <div className="termsandcondition">
            <p><h2 style={{fontWeight:530}} className="heading"><center>TERMS & CONDITIONS</center></h2>
            <br/><br/><h3>Eligibility<hr className="underline"></hr></h3>Users must be at least 18 years old to participate. They must provide accurate and complete registration details. BidCraze reserves the right to suspend or terminate accounts that violate these Terms.<br/><br/>
            <h3>User Accounts<hr className="underline"></hr></h3>Users are responsible for maintaining the security of their accounts. Any activity conducted under a user account is the responsibility of the account owner. Users must notify BidCraze immediately of any unauthorized account use.<br/><br/>
            <h3>Auction Rules<hr className="underline"></hr></h3>Sellers must provide accurate descriptions of listed items. Buyers must place bids in good faith, and bidding manipulation is strictly prohibited. Auctions close at the scheduled time, and the highest bidder wins. Winning bids are binding, and buyers must complete the purchase.<br/><br/>
            <h3>Payments & Fees<hr className="underline"></hr></h3>Buyers must complete payment within a day. BidCraze may charge listing fees, transaction fees, or commission fees. Failure to pay for a won auction may result in account suspension.<br/><br/>
            <h3> Shipping & Delivery<hr className="underline"></hr></h3>Sellers are responsible for shipping items to buyers in a timely manner. Buyers should report any shipping issues to BidCraze within 7 days. BidCraze is not liable for lost, damaged, or delayed shipments.<br/><br/>
            <h3>Prohibited Activities<hr className="underline"></hr></h3>Users must not use BidCraze for illegal activities, engage in fraudulent or shill bidding, post misleading or false item descriptions, or harass, threaten, or abuse other users.<br/><br/>
            <h3>Termination & Suspension<hr className="underline"></hr></h3>BidCraze reserves the right to suspend or terminate accounts for violations of these Terms. Users may close their accounts by contacting customer support<br/><br/>
            <h3>Limitation of Liability<hr className="underline"></hr></h3>BidCraze is not responsible for direct, indirect, incidental, or consequential damages arising from platform use. Users participate in auctions at their own risk.<br/><br/>
            <h3>Changes to These Terms<hr className="underline"></hr></h3>BidCraze may update these Terms at any time. Continued use after changes constitutes acceptance.<br/><br/>
            <h3>Contact Information<hr className="underline"></hr></h3>For questions or concerns, contact us at bidcraze@gmail.com.<br/><br/>
            <p style={{fontWeight:600}}><center>By using BidCraze, you acknowledge that you have read, understood, and agreed to these Terms and Conditions.</center></p>
            </p>
        </div>
        <img src="logo.png" alt="backgroundlogo" className="backgroundlogo"/>
        <Footer/>
        </>
    )
}