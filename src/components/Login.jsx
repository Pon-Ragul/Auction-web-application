import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import "./loginSignUp.css";
import Header from "./Header";
import Footer from "./Footer";
export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isFormValid, setIsFormValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
      navigate("/");
    }
  };

  return (
    <>
    <Header/>
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