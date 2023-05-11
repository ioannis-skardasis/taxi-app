import React from 'react';
import './Footer.css'; 

function Footer() {
  return (
    <footer className="footer">
      <div className="social-links">
        <a href="https://www.facebook.com"><i className="fab fa-facebook"></i></a>
        <a href="https://www.twitter.com"><i className="fab fa-twitter"></i></a>
      </div>
      <p className="footer-text">Copyright ©{new Date().getFullYear()} Ioannis Skardasis</p>
    </footer>
  );
}

export default Footer;
