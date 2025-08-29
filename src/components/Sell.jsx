import React, { useState } from "react";
import "./sellform.css";
import HeaderWrapper from "./HeaderWrapper";
import SellFooter from "./SellFooter";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

export default function Sell() {
  const { user } = useAuth();
  const [form, setForm] = useState({
    itemName: "",
    category: "",
    description: "",
    startingPrice: "",
    startDate: "",
    endDate: "",
  });

  const [imageFiles, setImageFiles] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleFiles = (e) => {
    const files = Array.from(e.target.files || []);
    setImageFiles(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    
    // Check if user is logged in
    if (!user) {
      alert("Please log in to create an auction.");
      return;
    }

    // Validate dates
    const startDate = new Date(form.startDate);
    const endDate = new Date(form.endDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (startDate < today) {
      alert("Start date cannot be in the past.");
      return;
    }

    if (endDate <= startDate) {
      alert("End date must be after start date.");
      return;
    }
    
    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("itemName", form.itemName.trim());
      formData.append("category", form.category);
      formData.append("description", form.description.trim());
      formData.append("startingPrice", form.startingPrice);
      formData.append("startDate", form.startDate);
      formData.append("endDate", form.endDate);
      formData.append("sellerId", user._id || user.id);
      formData.append("sellerName", user.name);
      imageFiles.forEach((file) => formData.append("images", file));

      const res = await axios.post("http://localhost:3001/auctionitems", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Auction created successfully!");
      // reset
      setForm({ itemName: "", category: "", description: "", startingPrice: "", startDate: "", endDate: "" });
      setImageFiles([]);
    } catch (err) {
      console.error(err);
      alert("Failed to create auction. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };
  
  return (
    <>
      <HeaderWrapper />
      <div className="sell-container">
        <div className="sell-header">
          <h1>Sell Your Items</h1>
          <p>Create an auction and start selling your items to the highest bidder</p>
        </div>
        
        <div className="sell-form">
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label className="label" htmlFor="itemName">Item Name</label>
                <input className="input-field" type="text" id="itemName" placeholder="Enter item name" required value={form.itemName} onChange={handleChange} />
              </div>
              
              <div className="form-group">
                <label className="label" htmlFor="category">Category</label>
                <select className="input-field" id="category" required value={form.category} onChange={handleChange}>
                  <option value="">Select category</option>
                  <option value="electronics">Electronics</option>
                  <option value="sports">Sports</option>
                  <option value="toys">Toys</option>
                  <option value="accessories">Accessories</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div className="form-group">
                <label className="label" htmlFor="startingPrice">Starting Price ($)</label>
                <input className="input-field" type="number" id="startingPrice" placeholder="0.00" min="0" step="0.01" required value={form.startingPrice} onChange={handleChange} />
              </div>
              
              <div className="form-group">
                <label className="label" htmlFor="startDate">Start Date</label>
                <input className="input-field" type="date" id="startDate" required value={form.startDate} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label className="label" htmlFor="images">Upload Images</label>
                <input className="input-field" type="file" id="images" multiple accept="image/*" onChange={handleFiles} />
              </div>

              <div className="form-group">
                <label className="label" htmlFor="endDate">End Date</label>
                <input className="input-field" type="date" id="endDate" required value={form.endDate} onChange={handleChange} />
              </div>

              <div className="form-group full-width">
                <label className="label" htmlFor="description">Description</label>
                <textarea className="input-field" id="description" placeholder="Describe your item" rows="4" required value={form.description} onChange={handleChange}></textarea>
              </div>
            </div>
            
            <button type="submit" className="button" disabled={submitting}>{submitting ? "Creating..." : "Create Auction"}</button>
          </form>
        </div>
      </div>
      <SellFooter />
    </>
  );
}
