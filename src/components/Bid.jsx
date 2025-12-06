import React, { useState, useEffect } from "react"; 
import HeaderWrapper from "./HeaderWrapper";
import SearchBar from "./SearchBar";
import LiveAuction from "./LiveAuction";
import UpcomingAuction from "./UpcomingAuction";
import BidFooter from "./BidFooter";
import EndedAuction from "./EndedAuction";
import axios from "axios";

export default function Bid() {
    const [auctions, setAuctions] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(false);
    
    // Fetch auction items from server
    const fetchAuctionItems = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:3001/auctionitems');
            const serverItems = response.data.map((item, index) => {
                
                const startDate = new Date(item.startDate);
                const endDate = new Date(item.endDate);
                
                // Calculate days left immediately
                const today = new Date();
                let daysLeft = 0;
                
                // Handle edge cases and invalid dates
                if (endDate && !isNaN(endDate.getTime())) {
                    daysLeft = Math.max(0, Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));
                    
                    // Additional debugging
                    if (daysLeft === 0) {
                        console.log(`Auction "${item.itemName}" has ended or ends today`);
                    }
                } else {
                    console.warn(`Invalid end date for item: ${item.itemName}`, item.endDate);
                }
                
                console.log(`Item: ${item.itemName}, End Date: ${endDate}, Today: ${today}, Days Left: ${daysLeft}`);

                return {
                    id: `server-${item._id}`,
                    name: item.itemName,
                    mrp: item.startingPrice * 1.5,
                    image: item.imageUrl || "/pixelcutt.jpg", 
                    basePrice: item.startingPrice,
                    startDate: startDate.toISOString().split('T')[0],
                    endDate: endDate.toISOString().split('T')[0],
                    daysLeft: daysLeft, // Add days left calculation here
                    category: item.category,
                    description: item.description,
                    // Add seller information
                    sellerName: item.sellerName || "Unknown Seller",
                    sellerId: item.sellerId,
                    sellerEmail: item.sellerEmail || "seller@gmail.com",
                    // Add seller review information
                    averageSellerRating: item.averageSellerRating || 0,
                    totalSellerReviews: item.totalSellerReviews || 0,
                    sellerReviews: item.sellerReviews || [],
                    // Add current bid information from database
                    currentBid: item.currentBid,
                    currentHighestBid: item.currentHighestBid,
                    currentBidder: item.currentBidder,
                    currentWinnerName: item.currentWinnerName
                };
            });
            
            // Set auctions to only server items
            setAuctions(serverItems);
            console.log('Fetched auction items:', serverItems.length);
        } catch (error) {
            console.error('Error fetching auction items:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAuctionItems();
        
        // Refresh data every 30 seconds to get new items
        const interval = setInterval(fetchAuctionItems, 30000);
        return () => clearInterval(interval);
    }, []);
    
    useEffect(() => {
        const calculateRemainingDays = (auctions) => {
            return auctions.map((auction) => {
                const endDate = new Date(auction.endDate);
                const today = new Date();
                let daysLeft = 0;
                
                // Handle edge cases and invalid dates
                if (endDate && !isNaN(endDate.getTime())) {
                    daysLeft = Math.max(0, Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));
                } else {
                    console.warn(`Invalid end date for auction: ${auction.name}`, auction.endDate);
                }
                
                return { ...auction, daysLeft };
            });
        };
        
        // Calculate days left immediately when component mounts
        setAuctions((prevAuctions) => calculateRemainingDays(prevAuctions));
        
        // Update days left every minute for real-time countdown
        const interval = setInterval(() => {
            setAuctions((prevAuctions) => calculateRemainingDays(prevAuctions));
        }, 60000); // Update every minute instead of every day
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

    // Debug logging for live auctions
    console.log('Live auctions with days left:', liveAuctions.map(auction => ({
        name: auction.name,
        daysLeft: auction.daysLeft,
        endDate: auction.endDate
    })));

    return (
        <>
            <HeaderWrapper/> 
            <SearchBar onSearch={handleSearch}/>
            <LiveAuction auctions={liveAuctions}/>
            <UpcomingAuction auctions={upcomingAuctions}/>
            <EndedAuction auctions={endedAuctions}/>
            <div className="Bid-footer"><BidFooter/></div>
        </>
    );
}
