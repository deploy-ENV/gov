import React, { useRef, useState } from 'react';
import { UploadCloud } from 'lucide-react';
import styles from './DragDropUpload.module.css';

function DragDropUpload({ label, name, onChange, file }) {
  const inputRef = useRef();
  const [dragActive, setDragActive] = useState(false);
  
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onChange({ target: { name, files: [e.dataTransfer.files[0]] } });
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <div 
      className={`${styles.uploadContainer} ${dragActive ? styles.dragActive : ''}`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <UploadCloud className={styles.uploadIcon} size={24} />
      <span className={styles.uploadText}>
        {file ? file.name : label}
      </span>
      <input 
        ref={inputRef} 
        type="file" 
        name={name} 
        className={styles.hiddenInput} 
        onChange={onChange} 
      />
    </div>
  );
}

export default DragDropUpload; 