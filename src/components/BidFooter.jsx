import React from "react";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaArrowLeft } from "react-icons/fa";
import {
    FaGithub, FaLinkedin
} from 'react-icons/fa';
import { Envelope } from "react-bootstrap-icons";
export default function BidFooter() {
    return (
        <>
            <Link to="/"><button className="backbutton"><FontAwesomeIcon icon={FaArrowLeft} />  Back</button></Link>
            <footer className="footer">
                <div className="footer-container">
                    <div className="footer-links">
                        <Link to="/term_and_condition">Terms & Conditions</Link>
                        <Link to="/privacy">Privacy</Link>
                        <Link to="/winningtips">Winning Tips</Link>
                        <Link to="/responsiblebidding">Responsible Bidding</Link>
                        <Link to="/faqs">FAQs</Link>
                        <Link to="/about">About Us</Link>
                    </div>
                    <div className="footer-socials">
                        <Link to="https://github.com/Pon-Ragul"><FaGithub color="white" size={30} /></Link>
                        <Link to="https://www.linkedin.com/in/pon-ragul-r-8b8b74292/" ><FaLinkedin color="white" size={30} /></Link>
                        <Link to="https://mail.google.com/mail/u/1/#inbox?compose=jrjtXLDgbfhGJljlTdcjNvBNQzwLqTdhqVBhrgxdKjLrpjJZLGjzVwzgLPscJjTbxPmxpDNq"><Envelope color="white" size={30} /></Link>
                    </div>
                    <p className="footer-copyright">
                        Copyright <span className="highlight">Bid Craze</span>. All rights reserved.
                    </p>
                </div>
            </footer>
        </>
    );
};