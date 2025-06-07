import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentPage } from "../../../redux/pharmacy/slice";
import styles from "./PromoBanners.module.css";

const PromoBanners = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleShopNow = (discount) => {
    dispatch(setCurrentPage(1));
    navigate(`/medicine?discount=${discount}&page=1`);
  };

  const handleReadMore = () => {
    navigate("/medicine-store");
  };

  return (
    <section>
      <div className={styles.container}>
        <ul className={styles.list}>
          <li className={styles.banner}>
            <div className={styles.roundWithTitle}>
              <div className={styles.round}>1</div>
              <h3 className={styles.title}>Huge Sale</h3>
            </div>
            <div className={styles.box}>
              <p className={styles.percentage}>70%</p>
              <button className={styles.btn} onClick={() => handleShopNow(70)}>
                Shop now
              </button>
            </div>
          </li>
          <li className={styles.banner}>
            <div className={styles.roundWithTitle}>
              <div className={styles.round}>2</div>
              <h3 className={styles.title}>Secure delivery</h3>
            </div>
            <div className={styles.box}>
              <p className={styles.percentage}>100%</p>
              <button className={styles.btn} onClick={handleReadMore}>
                Read more
              </button>
            </div>
          </li>
          <li className={styles.banner}>
            <div className={styles.roundWithTitle}>
              <div className={styles.round}>3</div>
              <h3 className={styles.title}>Off</h3>
            </div>
            <div className={styles.box}>
              <p className={styles.percentage}>35%</p>
              <button className={styles.btn} onClick={() => handleShopNow(35)}>
                Shop now
              </button>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default PromoBanners;
