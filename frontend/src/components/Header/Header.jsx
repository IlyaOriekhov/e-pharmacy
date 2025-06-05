import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import Logo from "./Logo/Logo";
import Menu from "./Menu/Menu";
import NavLinks from "./NavLinks/NavLinks";
import AuthLinks from "./AuthLinks/AuthLinks";
import UserIcons from "./UserIcons/UserIcons";
import styles from "./Header.module.css";
import sprite from "../../assets/icons/sprite.svg";

const Header = ({ pageType }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isDesktop = useMediaQuery({ query: "(min-width: 1440px)" });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleOpenMenu = () => setIsMenuOpen(true);
  const handleCloseMenu = () => setIsMenuOpen(false);

  const headerBackground =
    pageType === "home" ? styles.homeBackground : styles.defaultBackground;

  return (
    <>
      <header>
        <div className={`${styles.container} ${headerBackground}`}>
          <Logo pageType={pageType} />

          {isLoggedIn && !isDesktop && (
            <div className={styles.wrapper}>
              <UserIcons pageType={pageType} />
              <button className={styles.burgerBtn} onClick={handleOpenMenu}>
                <svg
                  className={
                    pageType === "home" ? styles.whiteSvg : styles.greenSvg
                  }
                >
                  <use href={`${sprite}#burger`} />
                </svg>
              </button>
            </div>
          )}

          {!isLoggedIn && !isDesktop && (
            <button className={styles.burgerBtn} onClick={handleOpenMenu}>
              <svg
                className={
                  pageType === "home" ? styles.whiteSvg : styles.greenSvg
                }
              >
                <use href={`${sprite}#burger`} />
              </svg>
            </button>
          )}

          {isLoggedIn && isDesktop && (
            <>
              <NavLinks />
              <div className={styles.box}>
                <UserIcons pageType={pageType} />
                <AuthLinks pageType={pageType} />
              </div>
            </>
          )}

          {!isLoggedIn && isDesktop && (
            <>
              <NavLinks />
              <AuthLinks pageType={pageType} />
            </>
          )}
        </div>
      </header>
      <Menu isOpen={isMenuOpen} onClose={handleCloseMenu} pageType={pageType} />
    </>
  );
};

export default Header;
