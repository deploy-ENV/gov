import React from 'react';
import { Loader2, CheckCircle } from 'lucide-react';
import styles from './AnimatedVerifyButton.module.css';

function AnimatedVerifyButton({ onClick, loading, verified, disabled }) {
  return (
    <button
      type="button"
      className={`${styles.verifyButton} ${verified ? styles.verified : ''} ${loading ? styles.loading : ''}`}
      onClick={onClick}
      disabled={disabled || loading || verified}
    >
      {loading && <Loader2 className={styles.loader} size={16} />}
      {verified && <CheckCircle className={styles.checkIcon} size={16} />}
      <span className={styles.buttonText}>
        {verified ? 'Verified' : loading ? 'Verifying...' : 'Verify'}
      </span>
    </button>
  );
}

export default AnimatedVerifyButton; 