import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectProduct } from "../../../redux/pharmacy/selectors";
import { selectIsLoggedIn, selectToken } from "../../../redux/auth/selectors";
import { addToCart, getCartItems } from "../../../redux/pharmacy/operations";
import { toast } from "react-toastify";
import { setToken } from "../../../redux/instance";
import Modal from "../../Modal/Modal";
import SignIn from "../../Modal/SignIn/SignIn";
import SignUp from "../../Modal/SignUp/SignUp";
import styles from "./ProductOverview.module.css";
import sprite from "../../../assets/icons/sprite.svg";

const ProductOverview = () => {
  const dispatch = useDispatch();
  const product = useSelector(selectProduct);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const token = useSelector(selectToken);
  const [amount, setAmount] = useState(1);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    if (storedToken) {
      setToken(storedToken);
    } else if (isLoggedIn && token) {
      setToken(token);
      localStorage.setItem("accessToken", token);
    }
  }, [isLoggedIn, token]);

  const handleOpenSignIn = () => setOpenSignIn(true);
  const handleCloseSignIn = () => setOpenSignIn(false);
  const handleOpenSignUp = () => setOpenSignUp(true);
  const handleCloseSignUp = () => setOpenSignUp(false);

  const handleIncreaseAmount = () => {
    const currentStock = parseInt(product?.stock) || 0;
    if (amount < currentStock) {
      setAmount((prev) => prev + 1);
    } else {
      toast.warning(`Only ${currentStock} items available in stock`);
    }
  };

  const handleDecreaseAmount = () => {
    if (amount > 1) {
      setAmount((prev) => prev - 1);
    }
  };

  const handleAddToCart = async (id) => {
    const storedToken = localStorage.getItem("accessToken");
    const currentToken = token || storedToken;

    if (!isLoggedIn || !currentToken) {
      handleOpenSignIn();
      return;
    }

    if (amount === 0 || amount < 1) {
      toast.info("Please select the quantity of the product");
      return;
    }

    if (!id) {
      toast.error("Product ID is missing");
      return;
    }

    try {
      setToken(currentToken);

      await dispatch(
        addToCart({
          productId: id,
          quantity: amount,
        })
      ).unwrap();

      dispatch(getCartItems());

      setAmount(1);
    } catch {
      // err
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  const currentStock = parseInt(product?.stock) || 0;
  const isOutOfStock = currentStock === 0;

  const storedToken = localStorage.getItem("accessToken");
  const isUserAuthenticated = isLoggedIn && (token || storedToken);

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
              {/* Показуємо інформацію про stock */}
              <p className={styles.stockInfo}>
                {isOutOfStock ? (
                  <span style={{ color: "#e85050" }}>Out of stock</span>
                ) : (
                  <span style={{ color: "#59B17A" }}>
                    {currentStock} items available
                  </span>
                )}
              </p>
            </div>
            <p className={styles.price}>{`৳${product.price}`}</p>
          </div>
          <div className={styles.btnBox}>
            <div className={styles.amountBox}>
              <button
                type="button"
                onClick={handleIncreaseAmount}
                disabled={isOutOfStock || amount >= currentStock}
              >
                <svg>
                  <use href={`${sprite}#plus`} />
                </svg>
              </button>
              <p>{amount}</p>
              <button
                type="button"
                onClick={handleDecreaseAmount}
                disabled={amount <= 1}
              >
                <svg>
                  <use href={`${sprite}#minus`} />
                </svg>
              </button>
            </div>
            <button
              className={`btn-primary ${styles.addToCartBtn}`}
              onClick={() => handleAddToCart(product._id)}
              disabled={!product._id || isOutOfStock}
              style={{
                opacity: isOutOfStock ? 0.6 : 1,
                cursor: isOutOfStock ? "not-allowed" : "pointer",
              }}
            >
              {isOutOfStock
                ? "Out of Stock"
                : isUserAuthenticated
                ? "Add to cart"
                : "Login to add"}
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
