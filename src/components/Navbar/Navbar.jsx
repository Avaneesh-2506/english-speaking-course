import React, { useState, useEffect } from 'react';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      // Background and box-shadow appear after 80px scroll
      setIsScrolled(window.scrollY > 80);

      // Simple active link calculation based on scroll pos
      const sections = ['home', 'about', 'courses', 'gallery', 'contact'];
      let current = 'home';
      for (let sec of sections) {
        const element = document.getElementById(sec);
        if (element && window.scrollY >= element.offsetTop - 100) {
          current = sec;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Courses', href: '#courses', id: 'courses' },
    { name: 'Gallery', href: '#gallery', id: 'gallery' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <header className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.navContainer}`}>
        <a href="#home" className={styles.logo} onClick={closeMenu}>
          iSpeak <span className={styles.accentText}>Well</span>
        </a>

        {/* Desktop Nav */}
        <nav className={styles.desktopNav}>
          <ul className={styles.navLinks}>
            {navLinks.map((link) => (
              <li key={link.name}>
                <a 
                  href={link.href} 
                  className={`${styles.navLink} ${activeSection === link.id ? styles.active : ''}`}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          <a href="#contact" className={styles.ctaButton}>Enroll Now</a>
        </nav>

        {/* Mobile Hamburger Icon */}
        <button 
          className={styles.hamburger} 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          <span className={`${styles.bar} ${isMobileMenuOpen ? styles.open : ''}`}></span>
          <span className={`${styles.bar} ${isMobileMenuOpen ? styles.open : ''}`}></span>
          <span className={`${styles.bar} ${isMobileMenuOpen ? styles.open : ''}`}></span>
        </button>

        {/* Mobile Menu Drawer */}
        <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.open : ''}`}>
          <ul className={styles.mobileNavLinks}>
            {navLinks.map((link) => (
              <li key={link.name}>
                <a 
                  href={link.href} 
                  className={`${styles.mobileNavLink} ${activeSection === link.id ? styles.active : ''}`}
                  onClick={closeMenu}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          <a href="#contact" className={styles.mobileCtaButton} onClick={closeMenu}>Enroll Now</a>
        </div>
        
        {/* Overlay for mobile menu */}
        <div 
          className={`${styles.overlay} ${isMobileMenuOpen ? styles.open : ''}`} 
          onClick={closeMenu}
        ></div>
      </div>
    </header>
  );
};

export default Navbar;
