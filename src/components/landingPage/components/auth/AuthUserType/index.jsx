import React from 'react';
import styles from './AuthUserType.module.css';

const USER_TYPES = [
  { label: 'Contractor', value: 'contractor' },
  { label: 'Government Officer', value: 'govt-officer' },
  { label: 'Supplier', value: 'supplier' },
];

export default function AuthUserType({ onUserTypeSelect }) {
  return (
    <div className={styles.container}>
      <div className={styles.buttonContainer}>
        {USER_TYPES.map((type) => (
          <button
            key={type.value}
            className={styles.userTypeButton}
            onClick={() => onUserTypeSelect(type.value)}
          >
            {type.label}
          </button>
        ))}
      </div>
    </div>
  );
} 