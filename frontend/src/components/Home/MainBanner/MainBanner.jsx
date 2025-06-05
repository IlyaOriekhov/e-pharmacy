import React from "react";
import styles from "./MainBanner.module.css";

const MainBanner = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.heroBox}>
          <h1 className={styles.title}>Your medication delivered</h1>
          <p className={styles.text}>
            Say goodbye to all your healthcare worries with us
          </p>
        </div>
      </div>
    </section>
  );
};

export default MainBanner;
