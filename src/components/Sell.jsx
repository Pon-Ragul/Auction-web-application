import {useState} from "react";
import {useForm} from "react-hook-form";
import "./sellform.css"; 
import Header from "./Header";
import Footer from "./Footer";

export default function AuctionForm() {
  const { register, handleSubmit, reset } = useForm(); 
  const [items, setItems] = useState([]);

  const onSubmit = (data) => {
    setItems([...items, data]); 
    reset(); 
  };

  const sendToAuction = () => {
    console.log("Items sent to auction:", items);
    alert("Items sent to auction successfully!");
    setItems([]); 
  };

  return (
    <>
      <Header />
      <div className="sell-container">
        <h2 className="title">Auction Form</h2><hr></hr>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-grid">
            {[
              { label: "Name", name: "name", type: "text" },
              { label: "Start Date", name: "startDate", type: "date" },
              { label: "End Date", name: "endDate", type: "date" },
              { label: "MRP", name: "mrp", type: "number" },
              { label: "Base Price", name: "basePrice", type: "number" },
              { label: "Image", name: "image", type: "file" },
            ].map(({ label, name, type }) => (
              <div className="form-group" key={name}>
                <label className="label">{label}</label>
                <input 
                  type={type}  
                  className="input-field" 
                  {...register(name, { required: true })} 
                />
              </div>
            ))}
          </div>
          <div className="form-group full-width">
            <label className="label">Seller Review</label>
            <textarea 
              className="input-field" 
              rows="4" 
              {...register("review", { required: true })} 
            ></textarea>
          </div>

          <button type="submit" className="button">Add Item</button>
        </form>
      </div>
        
      {items.length > 0 && (
        <div className="items-list">
          <h2 className="title">Items Ready For Auction</h2><hr></hr>
          <ul>
            {items.map((item, index) => (
              <li key={index}>
                <strong>{item.name}</strong> - MRP: {item.mrp} | Base Price: {item.basePrice}
              </li>
            ))}
          </ul>
          <button onClick={sendToAuction} className="button">Send to Auction</button>
        </div>
      )}
      <Footer/>
    </>
  );
}
