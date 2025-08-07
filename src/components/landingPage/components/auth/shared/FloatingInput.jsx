import React from 'react';
import styles from './FloatingInput.module.css';

function FloatingInput({ icon: Icon, label, type = 'text', name, value, onChange, required, ...props }) {
  const id = `input-${name}`;
  const isTextarea = type === 'textarea' || props.as === 'textarea';
  
  return (
    <div className={styles.inputContainer}>
      <Icon className={styles.inputIcon} size={18} />
      {isTextarea ? (
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className={`${styles.input} ${styles.textarea}`}
          autoComplete="off"
          {...props}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          className={styles.input}
          autoComplete="off"
          {...props}
        />
      )}
      <label 
        htmlFor={id} 
        className={`${styles.label} ${(value && value !== '') ? styles.labelActive : ''}`}
      >
        {label}
      </label>
    </div>
  );
}

export default FloatingInput; 