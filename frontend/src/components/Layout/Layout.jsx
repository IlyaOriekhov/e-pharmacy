import React, { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import styles from "./Layout.module.css";

const Layout = () => {
  const location = useLocation();
  const pageType = location.pathname.split("/")[1] || "home";

  return (
    <div className={styles.layoutWrapper}>
      <Header pageType={pageType} />
      <main className={styles.mainContent}>
        <Suspense fallback="Loading...">
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
