import React from "react";
import { NavLink } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import styles from "./AddPharmacyPromo.module.css";
import sprite from "../../../assets/icons/sprite.svg";

import addmedMob1x from "../../../assets/images/mob/addmed_mob@1x.png";
import addmedMob2x from "../../../assets/images/mob/addmed_mob@2x.png";
import addmedTab1x from "../../../assets/images/tab/addmed_tab@1x.png";
import addmedTab2x from "../../../assets/images/tab/addmed_tab@2x.png";
import addmedDesk1x from "../../../assets/images/desk/addmed_desk@1x.png";
import addmedDesk2x from "../../../assets/images/desk/addmed_desk@2x.png";

const AddPharmacyPromo = () => {
  const isMobileSmall = useMediaQuery({
    query: "(min-width: 320px) and (max-width: 374px)",
  });
  const isMobile = useMediaQuery({
    query: "(min-width: 375px) and (max-width: 767px)",
  });
  const isTablet = useMediaQuery({
    query: "(min-width: 768px) and (max-width: 1439px)",
  });
  const isDesktop = useMediaQuery({ query: "(min-width: 1440px)" });

  const getImageSrcSet = () => {
    if (isMobile || isMobileSmall) {
      return `${addmedMob1x} 1x, ${addmedMob2x} 2x`;
    }
    if (isTablet) {
      return `${addmedTab1x} 1x, ${addmedTab2x} 2x`;
    }
    if (isDesktop) {
      return `${addmedDesk1x} 1x, ${addmedDesk2x} 2x`;
    }
  };

  const features = [
    "Take user orders form online",
    "Create your shop profile",
    "Manage your store",
    "Get more orders",
    "Storage shed",
  ];

  const renderFeatureItem = (text, index) => (
    <li key={index} className={styles.featureItem}>
      <svg className={styles.featureIcon}>
        <use href={`${sprite}#lightning`} />
      </svg>
      {text}
    </li>
  );

  return (
    <section>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.contentBox}>
            <h2 className={styles.title}>
              Add the medicines you need online now
            </h2>
            <p className={styles.text}>
              Enjoy the convenience of having your prescriptions filled from
              home by connecting with your community pharmacy through our online
              platform.
            </p>
            <button className={styles.btn}>
              <NavLink to="/medicine-store" className={styles.btnLink}>
                Buy medicine
              </NavLink>
            </button>
          </div>
          <div className={styles.imgBox}>
            <img srcSet={getImageSrcSet()} alt="addmed" />
          </div>
        </div>

        <div className={styles.featuresWrapper}>
          <ul className={styles.featuresList}>
            {features.map((feature, index) =>
              renderFeatureItem(feature, `first-${index}`)
            )}
            {features.map((feature, index) =>
              renderFeatureItem(feature, `second-${index}`)
            )}
            {features.map((feature, index) =>
              renderFeatureItem(feature, `third-${index}`)
            )}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AddPharmacyPromo;
