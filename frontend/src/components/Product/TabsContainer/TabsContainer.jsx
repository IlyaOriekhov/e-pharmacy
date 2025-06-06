import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { selectProduct } from "../../../redux/pharmacy/selectors";
import styles from "./TabsContainer.module.css";
import sprite from "../../../assets/icons/sprite.svg";

const TabsContainer = () => {
  const product = useSelector(selectProduct);
  const [showDesc, setShowDesc] = useState(true);
  const [showReviews, setShowReviews] = useState(false);
  const isTabletOrDesktop = useMediaQuery({ query: "(min-width: 768px)" });

  if (!product) {
    return <div>Loading...</div>;
  }

  const {
    text,
    anti_cancer_properties,
    anti_diabetic_effects,
    digestive_aid,
    heart_health,
    immune_support,
    medicinal_uses,
  } = product.description || {};

  const handleReviewsClick = () => {
    setShowDesc(false);
    setShowReviews(true);
  };

  const handleDescClick = () => {
    setShowDesc(true);
    setShowReviews(false);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.btnBox}>
        <button
          className={`${styles.tabBtn} ${showDesc ? styles.active : ""}`}
          onClick={handleDescClick}
        >
          Description
        </button>
        <button
          className={`${styles.tabBtn} ${showReviews ? styles.active : ""}`}
          onClick={handleReviewsClick}
        >
          Reviews
        </button>
      </div>

      {showDesc && (
        <ul className={styles.descList}>
          {text && (
            <li className={styles.item}>
              <span className={styles.label}></span>
              {text}
            </li>
          )}
          {medicinal_uses && (
            <li className={styles.item}>
              <span className={styles.label}>
                Medicinal Uses: Antioxidant Properties:{" "}
              </span>
              {medicinal_uses}
            </li>
          )}
          {anti_diabetic_effects && (
            <li className={styles.item}>
              <span className={styles.label}>Anti-Diabetic Effects: </span>
              {anti_diabetic_effects}
            </li>
          )}
          {heart_health && (
            <li className={styles.item}>
              <span className={styles.label}>Heart Health: </span>
              {heart_health}
            </li>
          )}
          {anti_cancer_properties && (
            <li className={styles.item}>
              <span className={styles.label}>Anti-Cancer Properties: </span>
              {anti_cancer_properties}
            </li>
          )}
          {immune_support && (
            <li className={styles.item}>
              <span className={styles.label}>Immune Support: </span>
              {immune_support}
            </li>
          )}
          {digestive_aid && (
            <li className={styles.item}>
              <span className={styles.label}>Digestive Aid: </span>
              {digestive_aid}
            </li>
          )}
        </ul>
      )}

      {showReviews && (
        <ul className={styles.reviewsList}>
          {product.reviews && product.reviews.length > 0 ? (
            product.reviews.map((review, index) => (
              <li key={index} className={styles.reviewItem}>
                <div className={styles.imgNameBox}>
                  <div className={styles.imgBox}>
                    <img src={review.photo} alt="user" />
                  </div>
                  <div>
                    <h3 className={styles.name}>
                      {review.name || review.reviewer}
                    </h3>
                    <p className={styles.time}>{review.time || "2 days ago"}</p>
                  </div>
                </div>
                <p className={styles.reviewText}>
                  {review.testimonial || review.review}
                </p>
                <div className={styles.ratingBox}>
                  <div className={styles.stars}>
                    {[...Array(5)].map((_, starIndex) => (
                      <svg
                        key={starIndex}
                        className={
                          starIndex < (review.rating || 5)
                            ? styles.starIcon
                            : styles.starIconGray
                        }
                      >
                        <use href={`${sprite}#star`} />
                      </svg>
                    ))}
                    {!isTabletOrDesktop && (
                      <svg className={styles.starIcon}>
                        <use href={`${sprite}#star`} />
                      </svg>
                    )}
                  </div>
                  <p className={styles.rating}>{review.rating || 5}</p>
                </div>
              </li>
            ))
          ) : (
            <li className={styles.noReviews}>
              <p>No reviews yet. Be the first to leave a review!</p>
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default TabsContainer;
