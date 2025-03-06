import React, { useState } from "react"; 
import { Link, useNavigate } from "react-router-dom";
import './loginSignUp.css';

export default function Login() {
  const navigate=useNavigate();
  const [formData,setFormData] =useState({email:"",password:"",});
  const [isFormValid,setIsFormValid] = useState(false);
  const handleChange=(e)=>{
    const {name,value}=e.target;
    const updatedFormData={ ...formData,[name]:value};
    setFormData(updatedFormData);
    const allFieldsFilled=Object.values(updatedFormData).every(field=>field.trim()!=="");
    setIsFormValid(allFieldsFilled);
  };
  const handleSubmit=(e)=>{
    e.preventDefault(); 
    if(isFormValid){
      navigate("/"); 
    }
  };
  
  return (
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
              <input type="email" name="email" placeholder="BidCraze@gmail.com"  value={formData.email} onChange={handleChange}/>
            </div>
            <div>
              <div className="password-container">
                <label htmlFor="password">Password</label>
              </div>
              <input type="password" name="password"  placeholder="*****" value={formData.password} onChange={handleChange}/>
            </div>
          </div>
          <div className="actions">
            <button type="submit" className="sign-in-btn" disabled={!isFormValid}>Sign In</button>
            <p>Don't have an account?<Link to="/signup" className="sign-up-link">Sign up</Link>.</p>
          </div>
        </form>
      </div>
    </div> 
  );
};
