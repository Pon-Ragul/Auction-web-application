import React from "react";
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHome,faUserPlus, faSignInAlt, faUserCircle} from '@fortawesome/free-solid-svg-icons';
export default function Header(){
    return(
    <div className="Header">
      <header>
      <div className="container">
        <div className="d-flex justify-content-between py-2">
        <div className="logo text-black">
          <img src="Logo.png" alt="logo" className="Logo"/>
        </div>
          <div className="navicons">
            <Link to="/" className="btn btn-basic text-black"><FontAwesomeIcon icon={faHome} className="nav-icon-home"/>Home</Link>
            <Link to="/signup" className="btn btn-basic text-black"> <FontAwesomeIcon icon={faUserPlus} className="nav-icon" />Sign Up</Link>
            <Link to="/login" className="btn btn-basic text-black"><FontAwesomeIcon icon={faSignInAlt} className="nav-icon" />Sign In</Link>
            <Link to="/dashboard" className="btn btn-basic text-black"><FontAwesomeIcon icon={faUserCircle} className="nav-icon"/>Profile</Link>
          </div>
        </div>
      </div>
    </header>
    </div>
  );
}