import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import "./loginSignUp.css";
import HeaderWrapper from "./HeaderWrapper";
import Footer from "./Footer";
import { useAuth } from "../context/AuthContext";

export default function SignUp() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [isFormValid, setIsFormValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState(""); // "success" or "error"


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

    if (!isFormValid) return;

   axios.post("http://localhost:3001/signup", formData)
  .then((res) => {
    console.log(res.data);
    // Store user data in auth context
    login({
      email: formData.email,
      name: formData.name,
      id: res.data.id || Date.now() // Use timestamp as fallback ID
    });
    setAlertMessage("SIGNUP SUCCESSFUL!");
    setAlertType("success");
    setTimeout(() => navigate("/"), 1500);
  })
  .catch((err) => {
    console.error(err);
    if (err.response?.status === 400) {
      setAlertMessage(err.response.data.message); // e.g., "User already exists"
    } else {
      setAlertMessage("SIGNUP FAILED. PLEASE TRY AGAIN.");
    }
    setAlertType("error");
  });

  };

  return (
    <>
      <HeaderWrapper />
          {alertMessage && (
          <div className={`alert-box ${alertType}`}>
          {alertMessage}
          </div>
          )}
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
                <input
                  type="text"
                  name="name"
                  placeholder="UserName"
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <div className="password-input-container">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="*****"
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="eye-icon"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
            </div>
            <div className="actions">
              <button type="submit" className="sign-in-btn" disabled={!isFormValid}>
                Sign Up
              </button>
              <p>
                Already have an account?{" "}
                <Link to="/login" className="sign-up-link">
                  Sign in
                </Link>
                .
              </p>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
