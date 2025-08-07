import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import styles from './SelectInput.module.css';

function SelectInput({ label, name, value, onChange, required, options }) {
  const id = `select-${name}`;
  const [focused, setFocused] = useState(false);
  
  return (
    <div className={styles.selectContainer}>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        aria-label={label}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={styles.select}
      >
        <option value="" disabled hidden>{label}</option>
        {options}
      </select>
      <label 
        htmlFor={id} 
        className={`${styles.label} ${(value && value !== '') || focused ? styles.labelActive : ''}`}
      >
        {label}
      </label>
      <ChevronDown aria-hidden="true" className={styles.chevron} size={18} />
    </div>
  );
}

export default SelectInput; 