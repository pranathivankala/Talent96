import React from 'react';
import styles from './Footer.module.css';

export const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerSection}>
          <h4>About Talent96</h4>
          <p>
            At Talent96, we bridge the gap between top talent and leading recruiters, providing innovative solutions for recruitment, management, and optimization.
          </p>
        </div>
        <div className={styles.footerSection}>
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/Home">Home</a></li>
            <li><a href="/client-programs">Our Programs</a></li>
            <li><a href="/career">Career</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
        <div className={styles.footerSection}>
        <h4>Contact Us</h4>
          <p>Email: <a href="mailto:hr@talent96.com">hr@talent96.com</a></p>
          <p>Phone: <a href="tel:+918555978676">+91 8555978676</a></p>
          <p>
            Address: Hyderabad, Telangana.
          </p>
        </div>
        <div className={styles.footerSection}>
          <h4>Follow Us</h4>
          <div className={styles.socialIcons}>
            <a href="#facebook"><i className="fab fa-facebook-f"></i></a>
            <a href="#twitter"><i className="fab fa-twitter"></i></a>
            <a href="#instagram"><i className="fab fa-instagram"></i></a>
            <a href="#linkedin"><i className="fab fa-linkedin-in"></i></a>
          </div>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p>© 2025 Talent96. All rights reserved.</p>
      </div>
    </div>
  );
};
