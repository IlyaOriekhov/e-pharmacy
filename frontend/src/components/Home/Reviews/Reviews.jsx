import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { selectCustomerReviews } from "../../../redux/pharmacy/selectors";
import { getCustomerReviews } from "../../../redux/pharmacy/operations";
import styles from "./Reviews.module.css";

const Reviews = () => {
  const dispatch = useDispatch();
  const reviews = useSelector(selectCustomerReviews);

  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const isTablet = useMediaQuery({
    query: "(min-width: 768px) and (max-width: 1439px)",
  });
  const reviewsLimit = isMobile ? 1 : isTablet ? 2 : 3;

  useEffect(() => {
    dispatch(
      getCustomerReviews({
        limit: reviewsLimit,
      })
    );
  }, [dispatch, reviewsLimit]);

  return (
    <section>
      <div className={styles.container}>
        <h2 className={styles.title}>Reviews</h2>
        <p className={styles.text}>
          Search for Medicine, Filter by your location
        </p>
        <ul className={styles.list}>
          {reviews?.map((review) => (
            <li key={review._id} className={styles.item}>
              <div className={styles.imgBox}>
                <img src={review.photo} alt="person" />
              </div>
              <h3 className={styles.reviewerName}>{review.name}</h3>
              <p className={styles.testimonial}>{review.testimonial}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Reviews;
