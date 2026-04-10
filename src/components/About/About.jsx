import React, { useRef } from 'react';
import styles from './About.module.css';
import { SITE_DATA } from '../../data/siteData';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import ownerImg from '../../assets/Owner.jpeg';

const About = () => {
  const ref = useRef(null);
  const isVisible = useIntersectionObserver(ref, 0.1);
  const hasImage = true; // Use real image

  return (
    <section id="about" className={styles.about}>
      <div ref={ref} className={`container ${styles.aboutContainer}`}>
        
        <div className={`${styles.leftCol} fadeUp ${isVisible ? 'visible' : ''}`}>
          <div className={styles.imageWrapper}>
            {hasImage ? (
              <img src={ownerImg} alt={SITE_DATA.ownerName} className={styles.ownerImg} />
            ) : (
              <div className={styles.imgPlaceholder}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                  <circle cx="12" cy="13" r="4"></circle>
                </svg>
                <span>Owner Photo</span>
              </div>
            )}
          </div>
        </div>

        <div className={`${styles.rightCol} fadeUp ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: '0.2s' }}>
          <h2 className={styles.sectionTitle}>About Us</h2>
          <div className={styles.ownerInfo}>
            <h3 className={styles.ownerName}>{SITE_DATA.ownerName}</h3>
            <span className={styles.qualBadge}>{SITE_DATA.ownerQual}</span>
          </div>
          
          <p className={styles.bioText}>{SITE_DATA.ownerBio}</p>
          
          <ul className={styles.highlights}>
            <li>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
              Grammar-Free Conversational Method
            </li>
            <li>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
              Personality Development Included
            </li>
            <li>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
              Proven Track Record of Success
            </li>
          </ul>

          <div className={styles.locationBadge}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            Proudly based in {SITE_DATA.location}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
