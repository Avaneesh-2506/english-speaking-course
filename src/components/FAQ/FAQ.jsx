import React, { useState, useRef } from 'react';
import styles from './FAQ.module.css';
import { SITE_DATA } from '../../data/siteData';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

const FAQItem = ({ faq, isOpen, onClick }) => {
  const contentRef = useRef(null);

  return (
    <div className={`${styles.faqItem} ${isOpen ? styles.open : ''}`}>
      <button className={styles.faqQuestion} onClick={onClick}>
        <span>{faq.q}</span>
        <div className={styles.iconWrapper}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </div>
      </button>
      <div 
        ref={contentRef}
        className={styles.faqAnswerContainer}
        style={{ 
          maxHeight: isOpen ? (contentRef.current ? `${contentRef.current.scrollHeight}px` : '1000px') : '0px'
        }}
      >
        <div className={styles.faqAnswer}>
          <p>{faq.a}</p>
        </div>
      </div>
    </div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0); // First one open by default
  const ref = useRef(null);
  const isVisible = useIntersectionObserver(ref, 0.1);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={styles.faqSection}>
      <div ref={ref} className={`container fadeUp ${isVisible ? 'visible' : ''}`}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
          <p className={styles.sectionSubtitle}>Sawal Jawab - Clear your doubts here</p>
        </div>

        <div className={styles.faqList}>
          {SITE_DATA.faqs.map((faq, index) => (
            <FAQItem 
              key={index} 
              faq={faq} 
              isOpen={openIndex === index} 
              onClick={() => handleToggle(index)} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
