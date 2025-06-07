import React from "react";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../../redux/auth/selectors";
import RegisterBtn from "./RegisterBtn/RegisterBtn";
import LoginBtn from "./LoginBtn/LoginBtn";
import LogoutBtn from "./LogoutBtn/LogoutBtn";
import styles from "./AuthLinks.module.css";

const AuthLinks = ({ pageType, onLinkClick }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <div className={styles.wrapper}>
      {isLoggedIn ? (
        <LogoutBtn pageType={pageType} onLinkClick={onLinkClick} />
      ) : (
        <>
          <RegisterBtn pageType={pageType} onLinkClick={onLinkClick} />
          <LoginBtn pageType={pageType} onLinkClick={onLinkClick} />
        </>
      )}
    </div>
  );
};

export default AuthLinks;
