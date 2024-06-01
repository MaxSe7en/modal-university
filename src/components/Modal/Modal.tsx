import React, { useEffect, useState } from 'react';
import styles from './Modal.module.css';

const Modal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className={`${styles.modal} ${isOpen ? styles.open : ''}`}>
      <div className={styles.modalContent}>
        <div className={styles['general-info']}>
          <h4 className={`${styles['form-title']}`}>GENERAL INSTRUCTIONS</h4>
          <p className={styles['general-info-instructions']}>
            Please read all information on this form carefully before completing the form. Apply as early as possible to avoid
            disappointment as competition is keen.
          </p>
        </div>
        <button className={styles.closeButton} onClick={closeModal}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;