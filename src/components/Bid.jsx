import React, { useState, useEffect } from "react"; 
import Header from "./Header";
import SearchBar from "./SearchBar";
import LiveAuction from "./LiveAuction";
import UpcomingAuction from "./UpcomingAuction";
import BidFooter from "./BidFooter";
import EndedAuction from "./EndedAuction";
import axios from "axios";

export default function Bid() {
    const [auctions, setAuctions] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    
    // Fetch auction items from server
    useEffect(() => {
        const fetchAuctionItems = async () => {
            try {
                const response = await axios.get('http://localhost:3001/auctionitems');
                const serverItems = response.data.map((item, index) => {
                    // Format dates
                    const startDate = new Date(item.startDate);
                    const endDate = new Date(item.endDate);
                    
                    return {
                        id: `server-${item._id}`,
                        name: item.itemName,
                        mrp: item.startingPrice * 1.5, // Estimate MRP as 1.5x starting price
                        image: item.imageUrl || "/pixelcutt.jpg", // Use uploaded image or fallback
                        basePrice: item.startingPrice,
                        startDate: startDate.toISOString().split('T')[0],
                        endDate: endDate.toISOString().split('T')[0],
                        category: item.category,
                        description: item.description,
                        // Add seller information
                        sellerName: item.sellerName || "Unknown Seller",
                        sellerId: item.sellerId,
                        // Add seller review information
                        averageSellerRating: item.averageSellerRating || 0,
                        totalSellerReviews: item.totalSellerReviews || 0,
                        sellerReviews: item.sellerReviews || []
                    };
                });
                
                // Set auctions to only server items
                setAuctions(serverItems);
            } catch (error) {
                console.error('Error fetching auction items:', error);
            }
        };
        
        fetchAuctionItems();
    }, []);
    
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
            <Header/>
            <SearchBar onSearch={handleSearch}/>
            <LiveAuction auctions={liveAuctions}/>
            <UpcomingAuction auctions={upcomingAuctions}/>
            <EndedAuction auctions={endedAuctions}/>
            <div className="Bid-footer"><BidFooter/></div>
        </>
    );
}
