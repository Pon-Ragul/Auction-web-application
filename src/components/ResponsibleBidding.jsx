import React from "react";
import Header from "./Header";
import Footer from "./Footer";
export default function ResponsibleBidding(){
    return(
       <>
       <Header/>
        <div className="ResponsibleBidding">
        <p><h2 style={{fontWeight:530}} className="heading"><center>RESPONSIBLE BIDDING</center></h2>
            <br/><br/><h3>Responsible Bidding<hr className="underline"></hr></h3>Online bidding sites are a fun and exciting way of winning and purchasing Products. Our intention is that BidCraze.com provides a positive customer experience. To this end, we encourage our Users to bid responsibly at all times.<br/><br/>
            <h3>Risk of Addiction<hr className="underline"></hr></h3>At BidCraze, we understand that there is a risk, albeit a remote one, that taking part in time-critical Auctions may lead to addictive behavior, and indeed personal and social distress. This can occur if a User spends an excessive amount of time on the site, reducing the time he spends with family and friends. In this regard, BidCraze assumes a responsibility to provide the following relevant information to ensure that bidding on any Auction contributes to a User's experience in a positive way.<br/><br/>
            <h3>Guidelines<hr className="underline"></hr></h3>Please take the time to observe the following guidelines:<br/>Take regular breaks between bidding activities. Use the Autobids feature rather than concentrating on beating the timer.<br/>Decide on a monthly budget in advance as your own personal limit for use on the Bidderboy site. Do not increase the maximum limit later on.<br/>
            Before you start participating in any auction, decide the number of Bidderboy Credits you are willing to bid with, or determine a maximum price for the auction, after which you will stop bidding.<br/>Never participate under the influence of alcohol or drugs or medication or if you are in a depressive mood.<br/>
            Bid manually only when you are alert, fully rested and concentrating.<br/><br/>
            </p>
        </div>
        <img src="logo.png" alt="backgroundlogo" className="backgroundlogo"/>
        <Footer/>
       </>
    )
}