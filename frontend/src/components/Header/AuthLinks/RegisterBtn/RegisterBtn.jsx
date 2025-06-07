import React from "react";
import { NavLink } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import styles from "./RegisterBtn.module.css";

const RegisterBtn = ({ pageType, onLinkClick }) => {
  const isDesktop = useMediaQuery({ query: "(min-width: 1440px)" });

  const btnColor = !isDesktop
    ? "#f1f1f1"
    : isDesktop && pageType === "home"
    ? "#f1f1f1"
    : "#59B17A";

  const btnBorder = !isDesktop
    ? "1px solid rgba(241, 241, 241, 0.50)"
    : isDesktop && pageType === "home"
    ? "1px solid rgba(241, 241, 241, 0.50)"
    : "1px solid rgba(89, 177, 122, 0.50)";

  return (
    <button
      className={styles.btn}
      style={{ color: btnColor, border: btnBorder }}
    >
      <NavLink to="/register" className={styles.navLink} onClick={onLinkClick}>
        Register
      </NavLink>
    </button>
  );
};

export default RegisterBtn;
