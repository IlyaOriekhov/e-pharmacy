import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectProduct } from "../../../redux/pharmacy/selectors";
import { selectIsLoggedIn } from "../../../redux/auth/selectors";
import { addToCart, getCartItems } from "../../../redux/pharmacy/operations";
import { toast } from "react-toastify";
import Modal from "../../Modal/Modal";
import SignIn from "../../Modal/SignIn/SignIn";
import SignUp from "../../Modal/SignUp/SignUp";
import styles from "./ProductOverview.module.css";
import sprite from "../../../assets/icons/sprite.svg";

const ProductOverview = () => {
  const dispatch = useDispatch();
  const product = useSelector(selectProduct);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [amount, setAmount] = useState(1);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);

  const handleOpenSignIn = () => setOpenSignIn(true);
  const handleCloseSignIn = () => setOpenSignIn(false);
  const handleOpenSignUp = () => setOpenSignUp(true);
  const handleCloseSignUp = () => setOpenSignUp(false);

  const handleIncreaseAmount = () => {
    setAmount((prev) => prev + 1);
  };

  const handleDecreaseAmount = () => {
    if (amount > 1) {
      setAmount((prev) => prev - 1);
    }
  };

  const handleAddToCart = (id) => {
    if (!isLoggedIn) {
      handleOpenSignIn();
    } else {
      if (amount === 0) {
        toast.info("Please select the quantity of the product");
        return;
      }
      dispatch(
        addToCart({
          productId: id,
          quantity: amount,
        })
      );
      dispatch(getCartItems());
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.imgBox}>
          <img src={product.photo} alt="product" />
        </div>
        <div className={styles.infoBox}>
          <div className={styles.namePriceBox}>
            <div>
              <h1 className={styles.name}>{product.name}</h1>
              <p className={styles.text}>{product.category}</p>
            </div>
            <p className={styles.price}>{`৳${product.price}`}</p>
          </div>
          <div className={styles.btnBox}>
            <div className={styles.amountBox}>
              <button type="button" onClick={handleIncreaseAmount}>
                <svg>
                  <use href={`${sprite}#plus`} />
                </svg>
              </button>
              <p>{amount}</p>
              <button type="button" onClick={handleDecreaseAmount}>
                <svg>
                  <use href={`${sprite}#minus`} />
                </svg>
              </button>
            </div>
            <button
              className={`btn-primary ${styles.addToCartBtn}`}
              onClick={() => handleAddToCart(product._id)}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
      <Modal isOpen={openSignIn} onClose={handleCloseSignIn}>
        <SignIn onClose={handleCloseSignIn} onToggleModal={handleOpenSignUp} />
      </Modal>
      <Modal isOpen={openSignUp} onClose={handleCloseSignUp}>
        <SignUp onClose={handleCloseSignUp} onToggleModal={handleOpenSignIn} />
      </Modal>
    </>
  );
};

export default ProductOverview;
