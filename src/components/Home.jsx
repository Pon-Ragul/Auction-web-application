import React from "react";
import Header from "./Header";
import WelcomeBanner from "./Welcome";
import SellBid from "./SellBid";
import HomeFooter from "./HomeFooter";
import './Description.css';
export default function Home(){
  const BidOn=[
    "Electronics Gadgets",
    "Sports Kit",
    "Toys",
    "Accessories",
    "Wholesale Stocks",
    "And More",
  ];
  const Discount=[
    "Exclusive New Arrivals Only",
    "Secure & Trusted Payments",
    "Transparent Bidding, No Surprises",
    "Fast Shipping, No Delays"
  ]
  return(
    <div className="home">
      <Header/>
      <WelcomeBanner/>
      <div className="description">
        <h3><center>Incredible Discount Bidding Platform</center></h3>
        <p><center>100% RISKFREE ONLINE AUCTIONS, WIN or BUY BRANDED NEW PRODUCTS AT UP TO 85% HUGE DISCOUNT<br/>ALWAYS FAIR AUCTION GUARANTEED.</center></p>
        <div className="discount-container">
          <div className="discount-items">
            {Discount.map((item,index)=>(
            <div className="discount-item" key={index}>
              <div className="check-icon" ><img src="OIP.jpg" alt="check" height={30} width={30} className="tick"/></div>
                {item}
            </div>
            ))}
          </div>
        </div>
        </div>
        <div className="list-of-items">
          <div className="list-img">
            <img src="gadgets.png" alt="gadget-pic" className="gadget"/>   
            <div className="bid-container">
              <div className="bid-title"> BID ON </div>
              <div className="bid-items">
                {BidOn.map((item,index)=>(
                  <div className="bid-item" key={index}>
                    <div className="check-icon" ><img src="OIP.jpg" alt="check" height={30} width={30} className="tick"/></div>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
         <SellBid/>
         <HomeFooter/>
        </div>
      </div>
  );
} 