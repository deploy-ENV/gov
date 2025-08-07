import React from 'react';
import styles from './ParticleBackground.module.css';

function ParticleBackground() {
  return (
    <div className={styles.particleContainer}>
      {[...Array(12)].map((_, i) => (
        <div 
          key={i} 
          className={styles.particle}
          style={{
            width: `${24 + Math.random() * 32}px`,
            height: `${24 + Math.random() * 32}px`,
            left: `${Math.random() * 90}%`,
            top: `${Math.random() * 90}%`,
            animationDuration: `${8 + Math.random() * 8}s`,
            animationDelay: `${-Math.random() * 8}s`,
          }}
        />
      ))}
    </div>
  );
}

export default ParticleBackground; 