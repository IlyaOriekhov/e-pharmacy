import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { selectAllStores } from "../../redux/pharmacy/selectors";
import { getAllStores } from "../../redux/pharmacy/operations";
import { setCurrentPage } from "../../redux/pharmacy/slice";
import styles from "./MedicineStorePage.module.css";
import sprite from "../../assets/icons/sprite.svg";

const MedicineStorePage = () => {
  const dispatch = useDispatch();
  const stores = useSelector(selectAllStores);
  const isDesktop = useMediaQuery({ query: "(min-width: 1440px)" });
  const isTabletOrDesktop = useMediaQuery({ query: "(min-width: 768px)" });
  const storesLimit = isDesktop ? 9 : 8;

  useEffect(() => {
    dispatch(
      getAllStores({
        limit: storesLimit,
      })
    );
  }, [dispatch, storesLimit]);

  const handleVisitStore = () => {
    dispatch(setCurrentPage(1));
  };

  return (
    <section>
      <div className={styles.container}>
        <h2 className={styles.title}>Medicine store</h2>
        <div className={styles.wrapper}>
          <ul className={styles.list}>
            {stores?.map((store) => (
              <li key={store._id} className={styles.item}>
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
                  <a href={`tel:${store.phone}`}>
                    <p>{store.phone}</p>
                  </a>
                </div>
                {isTabletOrDesktop && (
                  <button className={styles.visitStoreBtn}>
                    <NavLink
                      to="/medicine?page=1"
                      className={styles.visitStoreLink}
                      onClick={handleVisitStore}
                    >
                      Visit Store
                    </NavLink>
                  </button>
                )}
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

export default MedicineStorePage;
