import React, { useState, useEffect } from 'react';
import styles from './Hero.module.css';
import heroImg1 from '../../assets/hero1.png';
import heroImg2 from '../../assets/hero2.png';

const words = ["Fluent", "Confident", "Professional", "Unstoppable"];
const heroImages = [heroImg1, heroImg2];

const Hero = () => {
  const [currentWord, setCurrentWord] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(slideTimer);
  }, []);
  
  // Real image variable logic
  const hasImage = true;

  useEffect(() => {
    const typeSpeed = isDeleting ? 75 : 150;
    const currentWordText = words[wordIndex];

    const handleType = () => {
      if (!isDeleting && currentWord === currentWordText) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && currentWord === '') {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      } else {
        const nextPartialWord = isDeleting 
          ? currentWordText.substring(0, currentWord.length - 1)
          : currentWordText.substring(0, currentWord.length + 1);
        setCurrentWord(nextPartialWord);
      }
    };

    const timer = setTimeout(handleType, typeSpeed);
    return () => clearTimeout(timer);
  }, [currentWord, isDeleting, wordIndex]);

  return (
    <section id="home" className={styles.hero}>
      <div className={`container ${styles.heroContainer}`}>
        
        <div className={`fadeUp visible ${styles.leftCol}`}>
          <div className={styles.timingBadge}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            7:30 AM – 7:30 PM Classes Available
          </div>
          
          <h1 className={styles.headline}>
            Become <span className={styles.typewriter}>{currentWord}<span className={styles.cursor}>|</span></span> <br /> in English
          </h1>
          
          <p className={styles.hindiSubtext}>
            And change your life. Join Ayodhya's best spoken English institute.
          </p>

          <div className={styles.ctaGroup}>
            <a href="#contact" className={styles.btnPrimary}>Enroll Now</a>
            <a href="tel:+919305342586" className={styles.btnOutline}>Call Now</a>
          </div>
        </div>

        <div className={`fadeUp visible ${styles.rightCol}`}>
          <div className={styles.imageWrapper}>
            {hasImage ? (
              heroImages.map((img, idx) => (
                <img 
                  key={idx} 
                  src={img} 
                  alt={`Hero ${idx + 1}`} 
                  className={`${styles.heroImage} ${idx === currentSlide ? styles.heroImageActive : ''}`} 
                />
              ))
            ) : (
              <div className={styles.imgPlaceholder}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                  <circle cx="12" cy="13" r="4"></circle>
                </svg>
                <span>Owner / Hero Image</span>
              </div>
            )}
            
            <div className={styles.floatingBadge}>
              <span className={styles.badgeNumber}>500+</span>
              <span className={styles.badgeText}>Students Trained</span>
            </div>
          </div>
        </div>

      </div>
      
      <a href="#about" className={styles.scrollArrow}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </a>
    </section>
  );
};

export default Hero;
