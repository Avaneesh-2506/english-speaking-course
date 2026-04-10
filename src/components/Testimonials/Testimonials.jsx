import React, { useState, useEffect, useRef } from 'react';
import styles from './Testimonials.module.css';
import { SITE_DATA } from '../../data/siteData';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const ref = useRef(null);
  const isVisible = useIntersectionObserver(ref, 0.1);
  const totalCards = SITE_DATA.testimonials.length;

  // Auto-scrolling logic
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalCards);
    }, 4000);

    return () => clearInterval(timer);
  }, [isPaused, totalCards]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalCards - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalCards);
  };

  const setIndex = (index) => {
    setCurrentIndex(index);
  };

  return (
    <section className={styles.testiSection}>
      <div ref={ref} className={`container fadeUp ${isVisible ? 'visible' : ''}`}>
        <h2 className={styles.sectionTitle}>What Our Students Say</h2>
        
        <div 
          className={styles.carouselContainer}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className={styles.slider} style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
            {SITE_DATA.testimonials.map((testi, idx) => (
              <div key={idx} className={styles.slideItem}>
                <div className={styles.testiCard}>
                  <div className={styles.quoteIcon}>
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
                  </div>
                  <div className={styles.stars}>
                    {[...Array(testi.rating)].map((_, i) => (
                      <span key={i} className={styles.star}>★</span>
                    ))}
                  </div>
                  <p className={styles.testiText}>"{testi.text}"</p>
                  <div className={styles.studentInfo}>
                    <h4 className={styles.studentName}>{testi.name}</h4>
                    <span className={styles.batchName}>{testi.batch}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className={`${styles.navControl} ${styles.prev}`} onClick={handlePrev}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>
          <button className={`${styles.navControl} ${styles.next}`} onClick={handleNext}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        </div>

        <div className={styles.dotsContainer}>
          {SITE_DATA.testimonials.map((_, idx) => (
            <button 
              key={idx} 
              className={`${styles.dot} ${idx === currentIndex ? styles.activeDot : ''}`}
              onClick={() => setIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
