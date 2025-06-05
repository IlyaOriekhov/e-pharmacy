import React from "react";
import styles from "./SocialMediaIcons.module.css";
import sprite from "../../../assets/icons/sprite.svg";

const SocialMediaIcons = () => {
  return (
    <div className={styles.wrapper}>
      <a
        href="https://www.facebook.com/goITclub/"
        target="_blank"
        rel="noreferrer"
      >
        <div className={styles.icon}>
          <svg>
            <use href={`${sprite}#facebook`} />
          </svg>
        </div>
      </a>
      <a
        href="https://www.instagram.com/goitclub/"
        target="_blank"
        rel="noreferrer"
      >
        <div className={styles.icon}>
          <svg>
            <use href={`${sprite}#instagram`} />
          </svg>
        </div>
      </a>
      <a href="https://www.youtube.com/c/GoIT" target="_blank" rel="noreferrer">
        <div className={styles.icon}>
          <svg>
            <use href={`${sprite}#youtube`} />
          </svg>
        </div>
      </a>
    </div>
  );
};

export default SocialMediaIcons;
