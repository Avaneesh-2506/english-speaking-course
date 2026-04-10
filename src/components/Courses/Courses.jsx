import React, { useRef } from 'react';
import styles from './Courses.module.css';
import { SITE_DATA } from '../../data/siteData';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

const CourseCard = React.memo(({ course, index }) => {
  return (
    <div className={styles.courseCard} style={{ animationDelay: `${index * 0.1}s` }}>
      <div className={styles.iconWrapper}>{course.icon}</div>
      <h3 className={styles.courseTitle}>{course.title}</h3>
      <p className={styles.courseDesc}>{course.desc}</p>
    </div>
  );
});

const Courses = () => {
  const ref = useRef(null);
  const isVisible = useIntersectionObserver(ref, 0.1);

  return (
    <section id="courses" className={styles.coursesSection}>
      <div ref={ref} className={`container fadeUp ${isVisible ? 'visible' : ''}`}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Our Courses</h2>
          <p className={styles.sectionSubtitle}>Comprehensive programs designed for your success</p>
        </div>

        <div className={styles.coursesGrid}>
          {SITE_DATA.courses.map((course, idx) => (
            <CourseCard key={idx} course={course} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Courses;
