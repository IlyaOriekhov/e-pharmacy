import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { selectCurrentPage } from "../../../redux/pharmacy/selectors";
import { setCurrentPage } from "../../../redux/pharmacy/slice";
import styles from "./Pagination.module.css";
import sprite from "../../../assets/icons/sprite.svg";

const Pagination = ({ totalPages }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentPage = useSelector(selectCurrentPage);
  const [searchParams] = useSearchParams();
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const buttonsPerPage = isMobile ? 2 : 3;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const updateUrlAndPage = useCallback(
    (pageNumber) => {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set("page", pageNumber.toString());
      navigate(`?${newSearchParams.toString()}`);
      dispatch(setCurrentPage(pageNumber));
    },
    [searchParams, navigate, dispatch]
  );

  const handlePageClick = useCallback(
    (pageNumber) => {
      updateUrlAndPage(pageNumber);
    },
    [updateUrlAndPage]
  );

  const handlePrevClick = () => {
    if (currentPage > 1) {
      updateUrlAndPage(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      updateUrlAndPage(currentPage + 1);
    }
  };

  const renderPageButtons = () => {
    const pageButtons = [];
    const start = Math.max(1, currentPage - Math.floor(buttonsPerPage / 2));
    const end = Math.min(totalPages, start + buttonsPerPage - 1);

    for (let i = start; i <= end; i++) {
      pageButtons.push(
        <button
          key={i}
          type="button"
          className={`${styles.btn} ${i === currentPage ? styles.current : ""}`}
          onClick={() => handlePageClick(i)}
        >
          {i}
        </button>
      );
    }

    return pageButtons;
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.btnList}>
        <button
          className={styles.btn}
          onClick={() => updateUrlAndPage(1)}
          disabled={currentPage === 1}
        >
          <svg className={styles.icon}>
            <use href={`${sprite}#left`} />
          </svg>
          <svg className={styles.icon}>
            <use href={`${sprite}#left`} />
          </svg>
        </button>
        <button
          className={styles.btn}
          onClick={handlePrevClick}
          disabled={currentPage === 1}
        >
          <svg className={styles.icon}>
            <use href={`${sprite}#left`} />
          </svg>
        </button>
      </div>
      <div className={styles.btnList}>
        {currentPage > Math.floor(buttonsPerPage / 2) + 1 && (
          <button className={styles.btn} onClick={handlePrevClick}>
            ...
          </button>
        )}
        {renderPageButtons()}
        {currentPage < totalPages - Math.floor(buttonsPerPage / 2) && (
          <button className={styles.btn} onClick={handleNextClick}>
            ...
          </button>
        )}
      </div>
      <div className={styles.btnList}>
        <button
          className={styles.btn}
          onClick={handleNextClick}
          disabled={currentPage === totalPages}
        >
          <svg className={styles.icon}>
            <use href={`${sprite}#right`} />
          </svg>
        </button>
        <button
          className={styles.btn}
          onClick={() => updateUrlAndPage(totalPages)}
          disabled={currentPage === totalPages}
        >
          <svg className={styles.icon}>
            <use href={`${sprite}#right`} />
          </svg>
          <svg className={styles.icon}>
            <use href={`${sprite}#right`} />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
