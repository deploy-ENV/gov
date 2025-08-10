import React from 'react';
import styles from './FloatingInput.module.css';

function FloatingInput({ 
  icon: Icon, 
  label, 
  type = 'text', 
  name, 
  value, 
  onChange, 
  required, 
  error,
  ...props 
}) {
  const id = `input-${name}`;
  const isTextarea = type === 'textarea' || props.as === 'textarea';
  
 
  const getValidationProps = () => {
    const validationProps = {};
    
    switch (name) {
      case 'age':
        validationProps.min = 18;
        validationProps.max = 100;
        break;
      case 'mobile':
        validationProps.pattern = '[0-9]{10}';
        validationProps.maxLength = 10;
        validationProps.minLength = 10;
        break;
      case 'password':
        validationProps.minLength = 6;
        validationProps.pattern = '^(?=.*[!@#$%^&*()_+\\-=\\[\\]{};\':"\\\\|,.<>\\/?]).*$';
        break;
      default:
        break;
    }
    
    return validationProps;
  };

  
  const getValidationMessage = () => {
    switch (name) {
      case 'age':
        return 'Age must be between 18 and 100 years';
      case 'mobile':
        return 'Mobile number must be exactly 10 digits';
      case 'password':
        return 'Password must be at least 6 characters and contain at least one special character';
      default:
        return '';
    }
  };
  
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
          className={`${styles.input} ${styles.textarea} ${error ? styles.inputError : ''}`}
          autoComplete="off"
          {...getValidationProps()}
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
          className={`${styles.input} ${error ? styles.inputError : ''}`}
          autoComplete="off"
          title={getValidationMessage()}
          {...getValidationProps()}
          {...props}
        />
      )}
      <label 
        htmlFor={id} 
        className={`${styles.label} ${(value && value !== '') ? styles.labelActive : ''}`}
      >
        {label}
      </label>
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
}

export default FloatingInput;