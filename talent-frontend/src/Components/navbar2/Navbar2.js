import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

import "../navbar2/Navbar2.css"; // Import the CSS file

function Navbar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <a href="#">JobConnect</a>
      </div>
      <ul className={`nav-links ${isMobileMenuOpen ? "active" : ""}`}>
        <li>
          <a href="#home">
            <i className="fa-solid fa-house"></i> Home
          </a>
        </li>
        <li>
          <a href="#post-job">
            <i className="fa-solid fa-briefcase"></i> Post a Job
          </a>
        </li>
        <li>
          <a href="#recruiter-login">
            <i className="fa-solid fa-user-tie"></i> Recruiter Login
          </a>
        </li>
      </ul>
      <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
        &#9776;
      </div>
    </nav>
  );
}

export default Navbar;
