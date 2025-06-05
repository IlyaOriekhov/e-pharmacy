import React from "react";
import { NavLink } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import styles from "./Logo.module.css";

import LogoWhiteMob from "../../../assets/icons/logowhite_mob.svg";
import LogoWhiteTabDesk from "../../../assets/icons/logowhite_tab_desk.svg";

const Logo = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  const getLogoSrc = () => {
    return isMobile ? LogoWhiteMob : LogoWhiteTabDesk;
  };

  return (
    <NavLink to="/home" className={styles.navLink}>
      <img
        src={getLogoSrc()}
        alt="E-Pharmacy Logo"
        className={styles.logoIcon}
      />
    </NavLink>
  );
};

export default Logo;
