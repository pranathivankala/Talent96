import React from 'react';
import styles from './Footer.module.css'; 
export const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.footerSection}>
        <h4>About Us</h4>
        <p>
          We are dedicated to connecting job seekers with recruiters through an intuitive platform that simplifies job posting and applications.
        </p>
      </div>
      <div className={styles.footerSection}>
        <h4>Quick Links</h4>
        <a href="#home" style={{ color: '#fff' }}>Home</a><br />
        <a href="#jobs" style={{ color: '#fff' }}>Find Jobs</a><br />
        <a href="#recruiters" style={{ color: '#fff' }}>Recruiters</a><br />
        <a href="#contact" style={{ color: '#fff' }}>Contact Us</a>
      </div>
      <div className={styles.footerSection}>
        <h4>Contact Us</h4>
        <p>Email: support@domain.com</p>
        <p>Phone: +91 93903720678</p>
        <p>Address: Hightech City, Hyderabad, India</p>
      </div>
      <div className={styles.socialIcons}>
        <h4>Follow Us</h4>
        <a href="#facebook" style={{ color: '#fff' }}><i className="fab fa-facebook-f"></i></a>
        <a href="#twitter" style={{ color: '#fff' }}><i className="fab fa-twitter"></i></a>
        <a href="#instagram" style={{ color: '#fff' }}><i className="fab fa-instagram"></i></a>
        <a href="#linkedin" style={{ color: '#fff' }}><i className="fab fa-linkedin-in"></i></a>
      </div>
      <div className={styles.newsletterForm}>
        <h4>Subscribe to Our Newsletter</h4>
        <form>
          <input type="email" placeholder="Enter your email" className={styles.input} />
          <button type="submit" className={styles.button}>Subscribe</button>
        </form>
      </div>
      <div className={styles.footerBottom}>
        © 2024 Talent96. All rights reserved.
      </div>
    </div>
  );
};
