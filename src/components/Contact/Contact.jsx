import React, { useRef, useState } from 'react';
import styles from './Contact.module.css';
import { SITE_DATA } from '../../data/siteData';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { sendEmail } from '../../utils/emailService';

const Contact = () => {
  const formRef = useRef();
  const sectionRef = useRef(null);
  const isVisible = useIntersectionObserver(sectionRef, 0.1);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState(null); // 'success' or 'error'
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const formData = new FormData(formRef.current);
    const newErrors = {};
    
    if (!formData.get('user_name')) newErrors.user_name = 'Name is required';
    if (!formData.get('user_phone')) newErrors.user_phone = 'Phone number is required';
    if (!formData.get('message')) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setFormStatus(null);
    
    const result = await sendEmail(formRef);
    
    if (result.success) {
      setFormStatus('success');
      formRef.current.reset();
    } else {
      setFormStatus('error');
    }
    
    setIsSubmitting(false);
    setTimeout(() => setFormStatus(null), 5000); // clear toast after 5s
  };

  return (
    <section id="contact" className={styles.contactSection}>
      <div ref={sectionRef} className={`container fadeUp ${isVisible ? 'visible' : ''}`}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Get In Touch</h2>
          <p className={styles.sectionSubtitle}>Take the first step towards fluency today</p>
        </div>

        <div className={styles.contactContainer}>
          {/* Form Column */}
          <div className={styles.formCol}>
            <div className={styles.formCard}>
              <h3 className={styles.formTitle}>Send us a message</h3>
              
              <form ref={formRef} onSubmit={handleSubmit} className={styles.contactForm}>
                <div className={styles.formGroup}>
                  <label htmlFor="user_name">Full Name *</label>
                  <input type="text" id="user_name" name="user_name" placeholder="John Doe" />
                  {errors.user_name && <span className={styles.errorText}>{errors.user_name}</span>}
                </div>
                
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="user_phone">Phone Number *</label>
                    <input type="tel" id="user_phone" name="user_phone" placeholder="9876543210" />
                    {errors.user_phone && <span className={styles.errorText}>{errors.user_phone}</span>}
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label htmlFor="user_email">Email (Optional)</label>
                    <input type="email" id="user_email" name="user_email" placeholder="john@example.com" />
                  </div>
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="message">Message *</label>
                  <textarea id="message" name="message" rows="4" placeholder="I want to join the spoken English batch..."></textarea>
                  {errors.message && <span className={styles.errorText}>{errors.message}</span>}
                </div>
                
                <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                  {isSubmitting ? (
                     <div className={styles.spinner}></div>
                  ) : "Send Message"}
                </button>
                
                {formStatus === 'success' && (
                  <div className={`${styles.toast} ${styles.toastSuccess}`}>
                    Message sent successfully! We'll call you back soon.
                  </div>
                )}
                {formStatus === 'error' && (
                  <div className={`${styles.toast} ${styles.toastError}`}>
                    Something went wrong. Please call us directly.
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Info Column */}
          <div className={styles.infoCol}>
            <div className={styles.infoCards}>
              
              <div className={styles.infoCard}>
                <div className={styles.infoIcon}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                </div>
                <div>
                  <h4>Email Us</h4>
                  <a href={`mailto:${SITE_DATA.email}`}>{SITE_DATA.email}</a>
                </div>
              </div>
              
              <div className={styles.infoCard}>
                <div className={styles.infoIcon}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                </div>
                <div>
                  <h4>Call Us</h4>
                  <div className={styles.phoneLinks}>
                    <a href={`tel:+${SITE_DATA.phones[0]}`}>+91 {SITE_DATA.phones[0]}</a>
                    <a href={`tel:+${SITE_DATA.phones[1]}`}>{SITE_DATA.phones[1]}</a>
                  </div>
                </div>
              </div>
              
              <div className={styles.infoCard}>
                <div className={styles.infoIcon}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                </div>
                <div>
                  <h4>Timings</h4>
                  <p>{SITE_DATA.timings}</p>
                </div>
              </div>

            </div>
            
            <div className={styles.mapContainer}>
              <iframe
                title="Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d296.6870832073804!2d82.14164541537717!3d26.759574614567395!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399a09006f7eccf5%3A0xc54887803befdee4!2sI%20speak%20well!5e1!3m2!1sen!2sin!4v1775791536626!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
