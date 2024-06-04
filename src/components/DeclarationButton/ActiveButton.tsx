import React from 'react';
import styles from './styles.module.css'
const ActiveButton = ({ onClick }: any) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`${styles["formbold-confirm-btn"]} ${styles["active"]}`} // Adjust the className according to your CSS modules or styles setup
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
        <g clipPath="url(#clip0_1667_1314)">
          <path
            d="M9.83343 12.8509L15.1954 7.48828L16.0208 8.31311L9.83343 14.5005L6.12109 10.7882L6.94593 9.96336L9.83343 12.8509Z"
            fill="#536387"
          />
        </g>
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

export default ActiveButton;
