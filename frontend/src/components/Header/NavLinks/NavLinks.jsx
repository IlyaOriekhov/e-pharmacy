import React from "react";
import { NavLink } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import sprite from "../../../assets/icons/sprite.svg";
import styles from "./NavLinks.module.css";

const NavLinks = () => {
  const isMobileOrTablet = useMediaQuery({ query: "(max-width: 1439px)" });

  return (
    <div className={styles.wrapper}>
      <svg className={styles.navBackground}>
        {isMobileOrTablet ? (
          <use href={`${sprite}#nav-vertical`} />
        ) : (
          <use href={`${sprite}#nav-horyzontal`} />
        )}
      </svg>
      <div className={styles.navBox}>
        <ul className={styles.navList}>
          <li>
            <NavLink
              to="/home"
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/medicine-store"
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
            >
              Medicine store
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/medicine"
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
            >
              Medicine
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavLinks;
