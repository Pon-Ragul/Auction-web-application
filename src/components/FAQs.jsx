import React from "react";
import Header from "./Header";
import Footer from "./Footer";
export default function Faqs(){
    return(
        <>
        <Header/>
        <div className="FAQs">
            <p><h2 style={{fontWeight:530}} className="heading"><center>FREQUENTLY ASKED QUESTIONS</center></h2>
            <br/><br/><h3>How do I create an account on BidCraze?</h3>To create an account, click on the Sign Up button on the homepage, fill in your details<br/><br/>
            <h3>How do I place a bid?</h3>Once logged in, browse available auctions, select an item, enter your bid amount, and confirm your bid.<br/><br/>
            <h3>What is proxy bidding?</h3>Proxy bidding allows you to set a maximum bid, and the system will automatically bid on your behalf up to that amount.<br/><br/>
            <h3>How do I know if I won an auction?</h3>You will receive an notification and which is available in the header of the website.<br/><br/>
            <h3> What payment methods do you accept?</h3>We accept credit/debit cards, PayPal, and other secure online payment options.<br/><br/>
            <h3>What happens if I win but don't pay?</h3>Failure to complete a purchase may result in penalties or account suspension.<br/><br/>
            <h3> How do I contact customer support?</h3>You can reach our support team through the Contact Us page or email us at support@bidcraze.com.<br/><br/>
            <h3>Can I cancel my bid?</h3>Bids cannot be canceled once placed, so be sure before confirming your bid.<br/><br/>
            <h3>How do I list an item for auction?</h3>Go to Sell an Item, fill in the details, upload photos, set a starting price, and submit your listing for approval.<br/><br/>
            <h3>Is there a bidding fee?</h3>There is no bidding in BidCraze.<br/><br/>
            </p>
        </div>
        <img src="logo.png" alt="backgroundlogo" className="backgroundlogo"/>
        <Footer/>
        </>
    )
}