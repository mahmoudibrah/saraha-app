import React from "react";
// import "./Footer.css";

const Footer = () => {
  return (
    <footer className=" text-white fixed-bottom  footer-container mt-5 ">
      <div className="footer-content">
        <p className="footer-text">
          Saraha &copy;  {new Date().getFullYear()} - 2023   Created by Mahmoud Ibrahim
        </p>
        <p className="footer-text">All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;