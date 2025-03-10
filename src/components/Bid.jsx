import React, { useState, useEffect } from "react"; 
import Header from "./Header";
import SearchBar from "./SearchBar";
import LiveAuction from "./LiveAuction";
import UpcomingAuction from "./UpcomingAuction";
import BidFooter from "./BidFooter";
import EndedAuction from "./EndedAuction";

export default function Bid() {
    const [auctions, setAuctions] = useState([
        { id: 1, name: "Rolex venerdi", mrp: 5000.0, image: "watch.jpg", basePrice: 1200, startDate: "2025-03-01", endDate: "2025-03-13" },
        { id: 2, name: "Apple iPhone 15 Pro Max", mrp: 135000.0, image: "iphone 15.jpeg", basePrice: 79990, startDate: "2025-03-17", endDate: "2025-03-30" },
        { id: 3, name: "Boat Stone 352 speaker", mrp: 800.0, image: "Boatspeaker.avif", basePrice: 120, startDate: "2025-02-17", endDate: "2025-03-13" },
        { id: 4, name: "Samsung S24 ultra", mrp: 105000.0, image: "Samsung s25 ultra.jpg", basePrice: 55990, startDate: "2025-03-02", endDate: "2025-03-13" },
        { id: 5, name: "Realme 7", mrp: 15000.0, image: "Realme7.webp", basePrice: 4999, startDate: "2025-02-23", endDate: "2025-02-28" },
        { id: 6, name: "Iqoo z7 pro", mrp: 25000.0, image: "Iqoo z7 pro.webp", basePrice: 8999, startDate: "2025-03-12", endDate: "2025-03-16" },
        { id: 7, name: "OnePlus 13", mrp: 70000.0, image: "oneplus13.webp", basePrice: 30990, startDate: "2025-03-06", endDate: "2025-03-13" },
        { id: 8, name: "Poco X2", mrp: 18000.0, image: "pocox2.jpg", basePrice: 5999, startDate: "2025-02-21", endDate: "2025-03-28" },
        { id: 9, name: "Redmi note 10 pro", mrp: 20000.0, image: "Redmi note 10 pro.jpg", basePrice: 6999, startDate: "2025-02-28", endDate: "2025-03-04" },
        { id: 10, name: "Redmi note 8", mrp: 12000.0, image: "redminote8.jpg", basePrice: 2590, startDate: "2025-03-05", endDate: "2025-03-07" }
    ]);
    const [searchQuery, setSearchQuery] = useState("");
    useEffect(() => {
        const calculateRemainingDays = (auctions) => {
            return auctions.map((auction) => {
                const endDate = new Date(auction.endDate).getTime();
                const today = new Date().getTime();
                const daysLeft = Math.max(0, Math.ceil((endDate - today) / (1000 * 60 * 60 * 24)));
                return { ...auction, daysLeft };
            });
        };
        setAuctions((prevAuctions) => calculateRemainingDays(prevAuctions));
        const interval = setInterval(() => {
            setAuctions((prevAuctions) => calculateRemainingDays(prevAuctions));
        }, 1000 * 60 * 60 * 24);
        return () => clearInterval(interval);
    }, []); 
    const handleSearch = (query) => {
        setSearchQuery(query.toLowerCase());
    };
    const currentDate = new Date();
    const filterAuctions = (auctionList)=>auctionList.filter(auction => auction.name.toLowerCase().includes(searchQuery));
    const liveAuctions = filterAuctions(auctions.filter(auction => new Date(auction.startDate) <= currentDate && new Date(auction.endDate) >= currentDate));
    const upcomingAuctions = filterAuctions(auctions.filter(auction => new Date(auction.startDate) > currentDate));
    const endedAuctions = filterAuctions(auctions.filter(auction => new Date(auction.endDate) < currentDate));

    return (
        <>
            <Header />
            <SearchBar onSearch={handleSearch} />
            <LiveAuction auctions={liveAuctions} />
            <UpcomingAuction auctions={upcomingAuctions} />
            <EndedAuction auctions={endedAuctions} />
            <div className="Bid-footer"><BidFooter /></div>
        </>
    );
}
