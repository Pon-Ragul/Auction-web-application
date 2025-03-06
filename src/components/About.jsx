import React from "react";
import Header from "./Header";
import Footer from "./Footer";
export default function About(){
    return(
        <>
        <Header/>
        <div className="aboutus">
        <p><h2 style={{fontWeight:530}} className="heading"><center>ABOUT US</center></h2><br/>
        Welcome to BidCraze, the ultimate online auction platform designed for buyers and sellers alike. Our mission is to provide a seamless, secure, and exciting bidding experience for users around the world. Whether you're hunting for rare collectibles, the latest gadgets, or great deals, BidCraze is the place to be.<br/><br/>
        At BidCraze, we prioritize transparency, trust, and user satisfaction. Our platform is equipped with advanced bidding tools, real-time auction updates, and secure payment methods to ensure a smooth transaction process.<br/><br/>
        Our community-driven approach allows buyers and sellers to connect in a dynamic marketplace where every bid counts. With a growing selection of auctions and an easy-to-use interface, we make online bidding fun and rewarding.<br/><br/>
        Join us and experience the thrill of winning at BidCraze! 🚀 </p>
        </div>
        <img src="logo.png" alt="backgroundlogo" className="backgroundlogo"/>
        <Footer/>
        </>
    )
}