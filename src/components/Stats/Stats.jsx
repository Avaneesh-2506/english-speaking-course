import React, { useRef } from 'react';
import styles from './Stats.module.css';
import { SITE_DATA } from '../../data/siteData';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { useCountUp } from '../../hooks/useCountUp';

const StatCard = ({ stat }) => {
  const ref = useRef(null);
  const isVisible = useIntersectionObserver(ref, 0.5);
  const count = useCountUp(stat.value, 2000, isVisible);

  return (
    <div ref={ref} className={styles.statCard}>
      <h3 className={styles.statValue}>
        {count}{stat.suffix}
      </h3>
      <p className={styles.statLabel}>{stat.label}</p>
    </div>
  );
};

const Stats = () => {
  return (
    <section className={styles.statsSection}>
      <div className={`container ${styles.statsContainer}`}>
        {SITE_DATA.stats.map((stat, index) => (
          <StatCard key={index} stat={stat} />
        ))}
      </div>
    </section>
  );
};

export default Stats;
