import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  selectSearchProducts,
  selectTotalPages,
} from "../../redux/pharmacy/selectors";
import {
  addToCart,
  getCartItems,
  getProductById,
} from "../../redux/pharmacy/operations";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import Filter from "../../components/Medicine/Filter/Filter";
import Pagination from "../../components/Medicine/Pagination/Pagination";
import Modal from "../../components/Modal/Modal";
import SignIn from "../../components/Modal/SignIn/SignIn";
import SignUp from "../../components/Modal/SignUp/SignUp";
import styles from "./MedicinePage.module.css";

const MedicinePage = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectSearchProducts);
  const totalPages = useSelector(selectTotalPages);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const navigate = useNavigate();
  const [openSignIn, setOpenSignIn] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);

  const handleOpenSignIn = () => setOpenSignIn(true);
  const handleCloseSignIn = () => setOpenSignIn(false);
  const handleOpenSignUp = () => setOpenSignUp(true);
  const handleCloseSignUp = () => setOpenSignUp(false);

  const handleAddToCart = (id) => {
    if (!isLoggedIn) {
      handleOpenSignIn();
    } else {
      dispatch(
        addToCart({
          productId: id,
          quantity: 1,
        })
      );
      dispatch(getCartItems());
    }
  };

  const handleDetailsClick = (id) => {
    dispatch(getProductById(id)).then(() => {
      navigate(`/product/${id}`);
    });
  };

  return (
    <>
      <section>
        <div className={styles.container}>
          <h2 className={styles.title}>Medicine</h2>
          <Filter />
          <ul className={styles.list}>
            {products &&
              products.length > 0 &&
              products?.map((product) => (
                <li key={product._id} className={styles.item}>
                  <div className={styles.imgBox}>
                    <img src={product.photo} alt="product" />
                  </div>
                  <div className={styles.info}>
                    <div className={styles.nameWithPriceBox}>
                      <h3 className={styles.subTitle}>{product.name}</h3>
                      <p className={styles.price}>{`৳${product.price}`}</p>
                    </div>
                    <p className={styles.text}>{product.category}</p>
                    <div className={styles.btnBox}>
                      <button
                        className={`btn-primary ${styles.addToCartBtn}`}
                        onClick={() => handleAddToCart(product._id)}
                      >
                        Add to cart
                      </button>
                      <button
                        className={styles.detailsBtn}
                        onClick={() => handleDetailsClick(product._id)}
                      >
                        Details
                      </button>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
          {products && products.length === 0 && (
            <div className={styles.noResults}>
              <p>Nothing was found for your request</p>
            </div>
          )}
          {totalPages > 1 && <Pagination totalPages={totalPages} />}
        </div>
      </section>
      <Modal isOpen={openSignIn} onClose={handleCloseSignIn}>
        <SignIn onClose={handleCloseSignIn} onToggleModal={handleOpenSignUp} />
      </Modal>
      <Modal isOpen={openSignUp} onClose={handleCloseSignUp}>
        <SignUp onClose={handleCloseSignUp} onToggleModal={handleOpenSignIn} />
      </Modal>
    </>
  );
};

export default MedicinePage;
