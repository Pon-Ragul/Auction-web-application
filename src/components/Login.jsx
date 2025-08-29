import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import "./loginSignUp.css";
import HeaderWrapper from "./HeaderWrapper";
import Footer from "./Footer";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isFormValid, setIsFormValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState(""); 


  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);
    const allFieldsFilled = Object.values(updatedFormData).every(
      (field) => field.trim() !== ""
    );
    setIsFormValid(allFieldsFilled);
  };

 const handleSubmit = (e) => {
  e.preventDefault();
  if (isFormValid) {
    axios.post("http://localhost:3001/login", formData)
      .then((res) => {
        console.log(res.data);
        // Store user data in auth context
        console.log("Login response:", res.data);
        login({
          email: formData.email,
          name: res.data.user.name || formData.email.split('@')[0], // Use email prefix if name not provided
          _id: res.data.user._id, // Store the MongoDB ObjectId as _id
          id: res.data.user._id // Also store as id for compatibility
        });
        setAlertMessage("LOGIN SUCCESSFUL!");
        setAlertType("success");
        setTimeout(() => navigate("/"), 1500);
      })
      .catch((err) => {
        if (err.response) {
          setAlertMessage(err.response.data.message); 
        } else {
          setAlertMessage("SOMETHING WENT WRONG. PLEASE TRY AGAIN.");
        }
        setAlertType("error");
        console.error(err);
      });
  }
};

  return (
    <>
    <HeaderWrapper/>
        {alertMessage && (
        <div className={`alert-box ${alertType}`}>
            {alertMessage}
        </div>
        )}
    <div className="login-page">
      <div className="login-container">
        <div className="header">
          <h1>Sign In</h1>
          <p>Sign In to access your account</p>
        </div>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <div>
              <label htmlFor="email">Email address</label>
              <input type="email" name="email" placeholder="BidCraze@gmail.com" value={formData.email} onChange={handleChange} required/>
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <div className="password-input-container">
                <input type={showPassword ? "text" : "password"} name="password" placeholder="*****" value={formData.password} onChange={handleChange} required/>
                <button type="button" className="eye-icon" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}</button>
              </div>
            </div>
          </div>
          <div className="actions">
            <button type="submit" className="sign-in-btn" disabled={!isFormValid}>Sign In</button>
            <p>Don't have an account?<Link to="/signup" className="sign-up-link">Sign up</Link>.</p>
          </div>
        </form>
      </div>
    </div>
    <Footer/>
    </>
  );
}