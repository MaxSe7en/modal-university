import React from 'react';
import styles from './styles.module.css'

const InactiveButton = ({ onClick }: any) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className={styles["formbold-confirm-btn"]} // Adjust the className according to your CSS modules or styles setup
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="11"
          cy="11"
          r="10.5"
          fill="white"
          stroke="#DDE3EC"
        />
        {/* Optional: Add elements here that indicate the button is inactive if needed */}
        <defs>
          <clipPath id="clip0_1667_1314">
            <rect
              width="14"
              height="14"
              fill="white"
              transform="translate(4 4)"
            />
          </clipPath>
        </defs>
      </svg>
      Yes! I declare.
    </button>
  );
};

export default InactiveButton;
