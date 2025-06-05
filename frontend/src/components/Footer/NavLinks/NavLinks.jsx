import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./NavLinks.module.css";

const NavLinks = () => {
  return (
    <ul className={styles.navList}>
      <li>
        <NavLink to="/home">Home</NavLink>
      </li>
      <li>
        <NavLink to="/medicine-store">Medicine store</NavLink>
      </li>
      <li>
        <NavLink to="/medicine">Medicine</NavLink>
      </li>
    </ul>
  );
};

export default NavLinks;
