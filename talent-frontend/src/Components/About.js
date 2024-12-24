import React from 'react';
import styles from './About.module.css';  

const About = () => {
  return (
    <div className={styles['about-page']}>
      <div className={styles['about-header']}>
        <h1>About Us</h1>
        <p>Connecting Talent with Opportunity – Your Trusted Recruitment Partner</p>
      </div>
      <div className={styles['company-overview']}>
        <h2>Company Overview</h2>
        <p>
          Talent96 is a newly established recruitment agency that specializes in three key areas of hiring: 
          <strong>Permanent Placement</strong>, <strong>Contract Staffing</strong>, and <strong>Contract-to-Hire (C2H)</strong> solutions. 
          Our primary goal is to connect top talent with businesses across various industries by offering flexible and efficient staffing 
          solutions tailored to each client's needs.
        </p>
      </div>
      <div className={styles['services-section']}>
        <h2>Our Services</h2>
        <div className={styles['services']}>
          <div className={styles['service']}>
            <h3>Permanent Placement</h3>
            <p>We help businesses find long-term employees who align with their organizational culture and growth goals.</p>
          </div>
          <div className={styles['service']}>
            <h3>Contract Staffing</h3>
            <p>We provide businesses with temporary staff for short-term projects, enabling rapid scaling without permanent commitments.</p>
          </div>
          <div className={styles['service']}>
            <h3>Contract-to-Hire (C2H)</h3>
            <p>Our hybrid solution allows candidates to work on a contract basis initially, with the option to transition into permanent roles based on performance and fit.</p>
          </div>
        </div>
      </div>
      <div className={styles['core-values']}>
        <h2>Our Core Values</h2>
        <ul>
          <li><strong>Integrity:</strong> Transparency and honesty in every interaction, fostering trust and long-term relationships.</li>
          <li><strong>Innovation:</strong> Leveraging modern technology and data-driven methods to streamline the hiring process.</li>
          <li><strong>Client-Centric:</strong> Tailored solutions that align with each client’s unique needs and goals.</li>
          <li><strong>Talent-First:</strong> Recognizing diverse skills and experiences, empowering businesses and candidates alike.</li>
          <li><strong>Adaptability:</strong> Staying flexible and responsive to market changes and client requirements.</li>
        </ul>
      </div>
      <div className={styles['closing-note']}>
        <p>
          At Talent96, we are committed to being a dynamic and reliable partner for organizations seeking top-tier talent. 
          With a focus on quality and innovation, we help businesses and candidates thrive in today's competitive market.
        </p>
      </div>
    </div>
  );
};

export default About;