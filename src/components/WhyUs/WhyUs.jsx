import React, { useRef } from 'react';
import styles from './WhyUs.module.css';
import { SITE_DATA } from '../../data/siteData';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

const WhyUs = () => {
  const ref = useRef(null);
  const isVisible = useIntersectionObserver(ref, 0.1);

  return (
    <section className={styles.whyUsSection}>
      <div ref={ref} className={`container fadeUp ${isVisible ? 'visible' : ''}`}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Why Choose Us?</h2>
          <p className={styles.sectionSubtitle}>Features that make us Ayodhya's top English coaching</p>
        </div>

        <div className={styles.featuresGrid}>
          {SITE_DATA.whyUs.map((feature, idx) => (
            <div key={idx} className={styles.featureCard}>
              <div className={styles.iconCircle}>
                {feature.icon}
              </div>
              <div className={styles.featureContent}>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDesc}>{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
