import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectNearestStores } from "../../../redux/pharmacy/selectors";
import { getNearestStores } from "../../../redux/pharmacy/operations"; // Прибрав getProductById
import styles from "./NearestStores.module.css";
import sprite from "../../../assets/icons/sprite.svg";

const NearestStores = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const nearestStores = useSelector(selectNearestStores);

  useEffect(() => {
    dispatch(
      getNearestStores({
        limit: 6,
      })
    );
  }, [dispatch]);

  const handleStoreClick = () => {
    // Прибрав параметр storeId
    // При натисканні на картку магазину перенаправляємо на сторінку Shop
    navigate("/medicine");
  };

  return (
    <section>
      <div className={styles.container}>
        <h2 className={styles.title}>Your Nearest Medicine Store</h2>
        <p className={styles.text}>
          Search for Medicine, Filter by your location
        </p>
        <div className={styles.wrapper}>
          <ul className={styles.list}>
            {nearestStores?.map((store) => (
              <li
                key={store._id}
                className={styles.item}
                onClick={handleStoreClick} // Прибрав передачу storeId
              >
                {/* Решта коду залишається без змін */}
                <h3 className={styles.subTitle}>{store.name}</h3>
                <div className={styles.addressBox}>
                  <svg className={styles.icon}>
                    <use href={`${sprite}#map`} />
                  </svg>
                  <ul className={styles.addressList}>
                    <li>
                      <a
                        href={`https://maps.google.com/?q=${store.address},${store.city}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {store.address}
                      </a>
                    </li>
                    <li>{store.city}</li>
                  </ul>
                </div>
                <div className={styles.phoneBox}>
                  <svg className={styles.icon}>
                    <use href={`${sprite}#phone`} />
                  </svg>
                  <a
                    href={`tel:${store.phone}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <p>{store.phone}</p>
                  </a>
                </div>
                <div className={styles.ratingWithBtn}>
                  <div className={styles.ratingBox}>
                    <svg className={styles.starIcon}>
                      <use href={`${sprite}#star`} />
                    </svg>
                    <p>{store.rating}</p>
                  </div>
                  <div
                    className={`${styles.isOpenItem} ${
                      store.isOpen ? styles.open : styles.closed
                    }`}
                  >
                    {store.isOpen ? "open" : "close"}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default NearestStores;
