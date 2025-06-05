import React from "react";
import { NavLink } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import styles from "./Logo.module.css";

import LogoBlackMob from "../../../assets/icons/logoblack_mob.svg";
import LogoBlackTabDesk from "../../../assets/icons/logoblack_tab_desk.svg";
import LogoWhiteMob from "../../../assets/icons/logowhite_mob.svg";
import LogoWhiteTabDesk from "../../../assets/icons/logowhite_tab_desk.svg";

const Logo = ({ pageType }) => {
  const isHomePage = pageType === "home";
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  const getLogoSrc = () => {
    if (isHomePage) {
      return isMobile ? LogoWhiteMob : LogoWhiteTabDesk;
    } else {
      return isMobile ? LogoBlackMob : LogoBlackTabDesk;
    }
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
