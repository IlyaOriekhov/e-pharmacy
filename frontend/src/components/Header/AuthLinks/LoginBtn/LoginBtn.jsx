import React from "react";
import { NavLink } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import styles from "./LoginBtn.module.css";

const LoginBtn = ({ pageType }) => {
  const isDesktop = useMediaQuery({ query: "(min-width: 1440px)" });

  const btnColor = !isDesktop
    ? "#F1F1F1"
    : isDesktop && pageType === "home"
    ? "#f1f1f1"
    : "#59B17A";

  return (
    <button className={styles.btn} style={{ color: btnColor }}>
      <NavLink to="/login" className={styles.navLink}>
        Login
      </NavLink>
    </button>
  );
};

export default LoginBtn;
