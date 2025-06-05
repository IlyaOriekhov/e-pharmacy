import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { logoutThunk } from "../../../../redux/auth/operations";
import styles from "./LogoutBtn.module.css";

const LogoutBtn = ({ pageType }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isDesktop = useMediaQuery({ query: "(min-width: 1440px)" });

  const handleLogoutClick = () => {
    dispatch(logoutThunk());
    if (pageType === "cart") {
      navigate("/home");
    }
  };

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
      onClick={handleLogoutClick}
    >
      Log out
    </button>
  );
};

export default LogoutBtn;
