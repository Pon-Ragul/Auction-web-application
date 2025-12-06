import React from "react";
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHome, faUserCircle, faBell} from '@fortawesome/free-solid-svg-icons';
import Notification from './Notification';

export default function Header2(){
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
              <Link to="/dashboard" className="btn btn-basic text-black"><FontAwesomeIcon icon={faUserCircle} className="nav-icon"/>Dashboard</Link>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}