import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import "./loginSignUp.css";
import Header from "./Header";
import Footer from "./Footer";
export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
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
      <div className="signup-container">
        <div className="header">
          <h1>Sign Up</h1>
          <p>Sign up to create your account</p>
        </div>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <div>
              <label htmlFor="name">Full Name</label>
              <input type="text" name="name" placeholder="UserName" value={formData.name} onChange={handleChange} required/>
            </div>
            <div>
              <label htmlFor="email">Email Address</label>
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
            <button type="submit" className="sign-in-btn" disabled={!isFormValid}> Sign Up </button>
            <p> Already have an account? <Link to="/login" className="sign-up-link">Sign in</Link>.</p>
          </div>
        </form>
      </div>
    </div>
    <Footer/>
    </>
  );
}
