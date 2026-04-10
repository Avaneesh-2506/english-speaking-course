import React, { useRef, useState } from 'react';
import styles from './Gallery.module.css';
import { SITE_DATA } from '../../data/siteData';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

const Gallery = () => {
  const ref = useRef(null);
  const isVisible = useIntersectionObserver(ref, 0.1);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const openLightbox = (index) => {
    setSelectedIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
    document.body.style.overflow = 'auto';
  };

  const nextImage = (e) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % SITE_DATA.gallery.length);
    }
  };

  const prevImage = (e) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === 0 ? SITE_DATA.gallery.length - 1 : selectedIndex - 1);
    }
  };

  return (
    <section id="gallery" className={styles.gallerySection}>
      <div ref={ref} className={`container fadeUp ${isVisible ? 'visible' : ''}`}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Our Gallery</h2>
          <p className={styles.sectionSubtitle}>Glimpses of success and learning at iSpeak Well</p>
        </div>

        <div className={styles.masonryGrid}>
          {SITE_DATA.gallery.map((item, idx) => (
            <div key={idx} className={styles.gridItem} onClick={() => openLightbox(idx)}>
              {item.src ? (
                <img src={item.src} alt={item.caption} className={styles.realImg} loading="lazy" />
              ) : (
                <div className={styles.imgPlaceholder}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                    <circle cx="12" cy="13" r="4"></circle>
                  </svg>
                  <span>Placeholder Image</span>
                </div>
              )}
              <div className={styles.overlay}>
                <span className={styles.captionText}>{item.caption}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedIndex !== null && (
        <div className={styles.lightboxOverlay} onClick={closeLightbox}>
          <button className={styles.closeBtn} onClick={closeLightbox}>&times;</button>
          
          <button className={styles.navBtn} onClick={prevImage}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>
          
          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            {SITE_DATA.gallery[selectedIndex].src ? (
              <img 
                src={SITE_DATA.gallery[selectedIndex].src} 
                alt={SITE_DATA.gallery[selectedIndex].caption} 
                className={styles.lightboxImg}
              />
            ) : (
              <div className={styles.lightboxPlaceholder}>
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                  <circle cx="12" cy="13" r="4"></circle>
                </svg>
                <span>Image Placeholder</span>
              </div>
            )}
            <p className={styles.lightboxCaption}>{SITE_DATA.gallery[selectedIndex].caption}</p>
          </div>

          <button className={styles.navBtn} onClick={nextImage}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        </div>
      )}
    </section>
  );
};

export default Gallery;
