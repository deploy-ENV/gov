import React from 'react';
import { motion } from 'framer-motion';

const blobs = [
  { color: 'bg-primary/10', size: 'w-56 h-56', top: 'top-10', left: 'left-20', delay: 0 },
  { color: 'bg-accent/10', size: 'w-40 h-40', top: 'top-1/2', left: 'left-10', delay: 1 },
  { color: 'bg-border/30', size: 'w-72 h-72', top: 'top-1/3', left: 'left-2/3', delay: 2 },
  { color: 'bg-primary/10', size: 'w-32 h-32', top: 'top-3/4', left: 'left-1/2', delay: 1.5 },
];

const ParticleBackground = () => (
  <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
    {blobs.map((blob, i) => (
      <motion.div
        key={i}
        className={`absolute ${blob.top} ${blob.left} ${blob.size} ${blob.color} rounded-full blur-3xl mix-blend-lighten animate-float`}
        style={{ filter: 'blur(40px)' }}
        animate={{
          y: [0, -20, 0],
          x: [0, 20, 0],
        }}
        transition={{
          duration: 10 + i * 2,
          repeat: Infinity,
          repeatType: 'loop',
          delay: blob.delay,
          ease: 'easeInOut',
        }}
      />
    ))}
  </div>
);

export default ParticleBackground; 