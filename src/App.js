import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Sell from './components/Sell';
import TermsAndConditions from './components/TermsAndCondition';
import Privacy from './components/Privacy';
import WinningTips from './components/WinningTips';
import ResponsibleBidding from './components/ResponsibleBidding';
import ScrollToTop from './components/ScrollToTop';
import Faqs from './components/FAQs';
import Bid from './components/Bid';
import './App.css';
export default function App(){
  return(
  <Router>
     <ScrollToTop/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/sell" element={<Sell/>}/>
      <Route path="/bid" element={<Bid/>}/>
      <Route path="/term_and_condition" element={<TermsAndConditions/>}/>
      <Route path="/privacy" element={<Privacy/>}/>
      <Route path="/winningtips" element={<WinningTips/>}/>
      <Route path="/responsiblebidding" element={<ResponsibleBidding/>}/>
      <Route path="/faqs" element={<Faqs/>}/>
      <Route path="/about" element={<About/>}/>
    </Routes>
  </Router>
  );
}
