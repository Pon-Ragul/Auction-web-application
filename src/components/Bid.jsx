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
                // Format dates
                const startDate = new Date(item.startDate);
                const endDate = new Date(item.endDate);
                
                return {
                    id: `server-${item._id}`,
                    name: item.itemName,
                    mrp: item.startingPrice * 1.5,
                    image: item.imageUrl || "/pixelcutt.jpg", 
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
            <HeaderWrapper/> 
            <SearchBar onSearch={handleSearch}/>
            <LiveAuction auctions={liveAuctions}/>
            <UpcomingAuction auctions={upcomingAuctions}/>
            <EndedAuction auctions={endedAuctions}/>
            <div className="Bid-footer"><BidFooter/></div>
        </>
    );
}
