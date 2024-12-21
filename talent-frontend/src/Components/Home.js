import React from 'react';
import styles from './Home.module.css';

const Home = () => {
    return (
        <div className={styles.homeContainer}>

            {/* Hero Section */}
            <div className={styles.heroSection}>
                <div className={styles.heroImage}>
                    <img
                        src="https://static.wixstatic.com/media/4f8f5a805e504f0c95afe05b01d26d77.jpg/v1/fill/w_1175,h_563,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/recruitment%20agency.jpg"
                        alt="Business Solutions"
                        className={styles.heroImageImg}
                    />
                </div>
                <div className={styles.heroContent}>
                    <p className={styles.heroSubtitle}>
                        Gyde Solutions offers a comprehensive suite of Recruitment, talent management, and operations optimization solutions to help organizations achieve sustainable growth and success. Our team of seasoned experts brings a wealth of knowledge and experience across a wide range of industries, enabling us to offer tailored solutions that are both practical and impactful.
                    </p>
                </div>
            </div>

           {/* Our Vision Section */}
           <div className={styles.rowSection}>
                <div className={styles.rowContent}>
                    <div className={styles.textSection}>
                        <h2 className={styles.sectionTitle}>Our Vision</h2>
                        <p className={styles.sectionContent}>
                            To become a global leader in providing innovative and tailored solutions that empower businesses to achieve their goals, driving excellence and long-term success in every industry we serve.
                        </p>
                    </div>
                    <div className={styles.imageSection}>
                        <img
                            src="https://bsmedia.business-standard.com/_media/bs/img/article/2020-04/12/full/1586706709-5731.jpg?im=FeatureCrop,size=(826,465)"
                            alt="Our Vision"
                            className={styles.sectionImage}
                        />
                    </div>
                </div>
            </div>

            {/* Our Mission Section */}
            <div className={styles.rowSection}>
                <div className={styles.rowContent}>
                    <div className={styles.imageSection}>
                        <img
                            src="https://corporatefilmmakersdelhincr.wordpress.com/wp-content/uploads/2014/11/corporatefilmmaker_6.jpg"
                            alt="Our Mission"
                            className={styles.sectionImage}
                        />
                    </div>
                    <div className={styles.textSection}>
                        <h2 className={styles.sectionTitle}>Our Mission</h2>
                        <p className={styles.sectionContent}>
                            To deliver exceptional value to our clients by offering cutting-edge recruitment, talent management, and operations optimization services that align with their unique needs, fostering a culture of growth, collaboration, and sustainability.
                        </p>
                    </div>
                </div>
            </div>

            {/* Our Services Section */}
            <div className={styles.servicesSection}>
                <h2 className={styles.sectionTitle}>Our Services</h2>
                <div className={styles.servicesContainer}>
                    <div className={styles.service}>
                        <h3 className={styles.serviceTitle}>Recruitment</h3>
                        <p className={styles.serviceDescription}>
                            We specialize in identifying top talent and matching them with the right opportunities across various industries.
                        </p>
                    </div>
                    <div className={styles.service}>
                        <h3 className={styles.serviceTitle}>Talent Management</h3>
                        <p className={styles.serviceDescription}>
                            Our talent management services focus on developing employees' skills, retention strategies, and performance optimization.
                        </p>
                    </div>
                    <div className={styles.service}>
                        <h3 className={styles.serviceTitle}>Operations Optimization</h3>
                        <p className={styles.serviceDescription}>
                            We help businesses streamline their operations, improve efficiency, and reduce costs through innovative solutions.
                        </p>
                    </div>
                </div>
            </div>

            {/* Why Choose Us Section */}
            <div className={styles.whyChooseUsSection}>
                <h2 className={styles.sectionTitle}>Why Choose Us?</h2>
                <div className={styles.whyChooseUsContainer}>
                    <div className={styles.whyChooseUsContent}>
                        <h3>Our Commitment to Excellence</h3>
                        <p>
                            At Gyde Solutions, we believe in providing value-driven services. Our unique blend of expertise, collaboration, and technology sets us apart in the industry. Here are a few reasons why businesses choose us:
                        </p>
                        <ul>
                            <li>Proven track record of success</li>
                            <li>Customized solutions tailored to your business needs</li>
                            <li>Expert consultants with extensive industry experience</li>
                            <li>Commitment to long-term relationships and client success</li>
                        </ul>
                    </div>
                    <div className={styles.whyChooseUsImage}>
                        <img
                            src="https://www.krmangalam.edu.in/wp-content/uploads/2024/02/33bs_Management-768x444-1.webp"
                            alt="Why Choose Us"
                            className={styles.image}
                        />
                    </div>
                </div>
            </div>

           {/* Our Solutions Section */}
<div className={styles.solutionsSection}>
    <h2 className={styles.sectionTitle}>Our Solutions</h2>
    <div className={styles.solutionsContainer}>
        <div className={styles.solutionCard}>
            <h3 className={styles.solutionTitle}>Talent Gyde</h3>
            <p className={styles.solutionDescription}>
                Connecting Right Talent to Right Opportunity
            </p>
            <button className={styles.learnMoreButton}>Learn More</button>
        </div>
        <div className={styles.solutionCard}>
            <h3 className={styles.solutionTitle}>Human Resource</h3>
            <p className={styles.solutionDescription}>
                Unlocking the Power of HR to Fuel Your Success
            </p>
            <button className={styles.learnMoreButton}>Learn More</button>
        </div>
        <div className={styles.solutionCard}>
            <h3 className={styles.solutionTitle}>Launch Pad</h3>
            <p className={styles.solutionDescription}>
                Train and Deploy - Nurturing Talent, Amplifying Impact
            </p>
            <button className={styles.learnMoreButton}>Learn More</button>
        </div>
        <div className={styles.solutionCard}>
            <h3 className={styles.solutionTitle}>Operations Excellence</h3>
            <p className={styles.solutionDescription}>
                Empowering Organizations to Reach New Heights
            </p>
            <button className={styles.learnMoreButton}>Learn More</button>
        </div>
    </div>
</div>


            {/* Contact Us Section */}
            <div className={styles.contactUsSection}>
                <h2 className={styles.sectionTitle}>Get In touch</h2>
                <p>
                    Interested in learning more about our services or discussing how we can help your business? Get in touch with us today!
                </p>
                <button className={styles.contactButton}>Contact Us</button>
            </div>

        </div>
    );
};

export default Home;
