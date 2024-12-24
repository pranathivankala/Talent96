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
                        "Talent96" is your gateway to discovering and nurturing exceptional talent. We specialize in innovative recruitment, skill development, and career opportunities that empower individuals and organizations to thrive in a competitive world.
                    </p>
                </div>
            </div>

            {/* Our Vision Section */}
            <div className={styles.rowSection}>
                <div className={styles.rowContent}>
                    <div className={styles.textSection}>
                        <h2 className={styles.sectionTitle}>Our Vision</h2>
                        <p className={styles.sectionContent}>
                            To become a leading global platform connecting talent with opportunities, fostering growth and excellence in every industry we serve.
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
                            To empower individuals and organizations by bridging the gap between talent and opportunities, delivering impactful and sustainable growth solutions.
                        </p>
                    </div>
                </div>
            </div>

            {/* Our Services Section */}
            <div className={styles.servicesSection}>
                <h2 className={styles.sectionTitle}>Our Services</h2>
                <div className={styles.servicesContainer}>
                    <div className={styles.service}>
                        <h3 className={styles.serviceTitle}>Talent Acquisition</h3>
                        <p className={styles.serviceDescription}>
                            We specialize in identifying top talent and matching them with the right opportunities across various industries.
                        </p>
                    </div>
                    <div className={styles.service}>
                        <h3 className={styles.serviceTitle}>Skill Development</h3>
                        <p className={styles.serviceDescription}>
                            Offering tailored programs to upskill and reskill individuals, preparing them for the future of work.
                        </p>
                    </div>
                    <div className={styles.service}>
                        <h3 className={styles.serviceTitle}>Career Advancement</h3>
                        <p className={styles.serviceDescription}>
                            Helping professionals advance in their careers through guidance, training, and mentorship programs.
                        </p>
                    </div>
                </div>
            </div>

            {/* Why Choose Us Section */}
            <div className={styles.whyChooseUsSection}>
                <h2 className={styles.sectionTitle}>Why Choose Us?</h2>
                <div className={styles.whyChooseUsContainer}>
                    <div className={styles.whyChooseUsContent}>
                        <p>
                            At Talent96, we believe in transforming potential into performance. Here’s why you should partner with us:
                        </p>
                        <ul>
                            <li>Proven expertise in talent identification and management</li>
                            <li>Tailored solutions for businesses and individuals</li>
                            <li>Dedicated team of consultants and coaches</li>
                            <li>Long-term commitment to client success</li>
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

        </div>
    );
};

export default Home;
