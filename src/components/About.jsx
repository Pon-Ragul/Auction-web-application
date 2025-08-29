import React from "react";
import HeaderWrapper from "./HeaderWrapper";
import Footer from "./Footer";
import "./Description.css";

export default function About() {
  return (
    <>
      <HeaderWrapper />
      <div className="description">
        <h3><center>About BidCraze</center></h3>
        <p>
          <center>
            BidCraze is a revolutionary online auction platform that brings the excitement of bidding to your fingertips. 
            Our mission is to provide a secure, transparent, and user-friendly environment where buyers and sellers can 
            connect through the thrill of competitive bidding.
          </center>
        </p>
        <p>
          <center>
            Founded with the vision of democratizing the auction experience, BidCraze offers a wide range of products 
            from electronics and gadgets to sports equipment, toys, and accessories. We ensure that every auction is 
            conducted fairly with complete transparency, allowing users to bid with confidence.
          </center>
        </p>
        <p>
          <center>
            Our platform features real-time bidding, secure payment processing, and comprehensive buyer protection. 
            Whether you're a seasoned collector or a first-time bidder, BidCraze provides the tools and support you 
            need to participate in exciting auctions and win amazing deals.
          </center>
        </p>
      </div>
      <Footer />
    </>
  );
}