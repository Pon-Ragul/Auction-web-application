import React from "react";
import Header from "./Header";
import Footer from "./Footer";
export default function Privacy(){
    return(
        <>
        <Header/>
        <div className="termsandcondition">
            <p><h2 style={{fontWeight:530}} className="heading"><center>PRIVACY</center></h2>
            <br/><br/><h3>Information We Collect<hr className="underline"></hr></h3>We collect personal information such as your name, email address, phone number, and payment details when you register on BidCraze. Additionally, we may collect non-personal information like IP addresses, browser type, and usage patterns to enhance your experience.<br/><br/>
            <h3>How We Use Your Information<hr className="underline"></hr></h3>We use your personal information to provide and improve our services, facilitate transactions, process payments, and communicate with you. We may also use your data to send promotional offers, enforce our policies, and comply with legal requirements.<br/><br/>
            <h3>Sharing of Information<hr className="underline"></hr></h3>BidCraze does not sell or rent your personal information to third parties. However, we may share your data with service providers who assist us with payment processing, fraud prevention, and customer support. Additionally, we may disclose your information if required by law or to protect our rights and users.<br/><br/>
            <h3> Data Security<hr className="underline"></hr></h3>We implement industry-standard security measures to protect your personal information from unauthorized access, loss, or misuse. However, no online platform is entirely secure, and we cannot guarantee absolute security.<br/><br/>
            <h3>User Rights & Choices<hr className="underline"></hr></h3>We retain your personal information for as long as necessary to provide services, comply with legal obligations, and resolve disputes. Once no longer needed, we securely delete or anonymize the data.<br/><br/>
            <h3>Children's Privacy<hr className="underline"></hr></h3>BidCraze is not intended for users under the age of 18. We do not knowingly collect personal information from minors. If we discover such data, we will take appropriate action to delete it.
            <br/><br/>
            <h3>Retention of Data<hr className="underline"></hr></h3>We retain your personal information for as long as necessary to provide services, comply with legal obligations, and resolve disputes. Once no longer needed, we securely delete or anonymize the data.   <br/><br/>
            <h3> Changes to This Privacy Policy<hr className="underline"></hr></h3>We may update this Privacy Policy periodically. Any changes will be posted on this page, and continued use of BidCraze signifies acceptance of the updated policy.<br/><br/>
            <h3>Contact Information<hr className="underline"></hr></h3>For questions or concerns, contact us at bidcraze@gmail.com.<br/><br/><br/><br/>
            <p style={{fontWeight:600}}><center>By using BidCraze, you acknowledge that you have read, understood, and agreed to these Terms and Conditions.</center></p>
            </p>
        </div>
        <img src="logo.png" alt="backgroundlogo" className="backgroundlogo"/>
        <Footer/>
        </>
    )
}