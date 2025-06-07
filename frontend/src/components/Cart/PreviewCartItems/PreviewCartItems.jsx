import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectCart } from "../../../redux/pharmacy/selectors";
import {
  addToCart,
  decreaseQuantity,
  deleteFromCart,
  getCartItems,
  getProductById,
} from "../../../redux/pharmacy/operations";
import styles from "./PreviewCartItems.module.css";
import sprite from "../../../assets/icons/sprite.svg";

const PreviewCartItems = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector(selectCart);

  const cartItems = cart?.cartProducts || cart?.items || [];

  useEffect(() => {
    dispatch(getCartItems());
  }, [dispatch]);

  const handleIncreaseAmount = (id) => {
    dispatch(
      addToCart({
        productId: id,
        quantity: 1,
      })
    );
  };

  const handleDecreaseAmount = (id, currentQuantity) => {
    if (currentQuantity <= 1) {
      dispatch(deleteFromCart(id));
    } else {
      dispatch(
        decreaseQuantity({
          productId: id,
          quantity: currentQuantity - 1,
        })
      );
    }
  };

  const handleDeleteProduct = (id) => {
    dispatch(deleteFromCart(id));
  };

  const handleProductClick = (id) => {
    dispatch(getProductById(id)).then(() => {
      navigate("/product");
    });
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.emptyCart}>
          <p>Your cart is empty</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <ul className={styles.list}>
        {cartItems.map((item, index) => {
          const product = item.productId || item.product || item;
          const quantity = item.quantity || 1;

          if (!product) {
            return null;
          }

          return (
            <li
              key={product._id || product.id || index}
              className={styles.item}
              onClick={() => handleProductClick(product._id || product.id)}
            >
              <div className={styles.imgBox}>
                <img
                  src={product.photo || product.image || "/placeholder.jpg"}
                  alt="product"
                  onError={(e) => {
                    e.target.src = "/placeholder.jpg";
                  }}
                />
              </div>
              <div className={styles.textBox}>
                <div className={styles.mainTextWrap}>
                  <div>
                    <h3 className={styles.subtitle}>
                      {product.name || "Unknown Product"}
                    </h3>
                    <p className={styles.text}>
                      {product.category || "Unknown Category"}
                    </p>
                  </div>
                  <p className={styles.price}>{`৳ ${product.price || 0}`}</p>
                </div>
                <div className={styles.btnBox}>
                  <div className={styles.amountBox}>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleIncreaseAmount(product._id || product.id);
                      }}
                    >
                      <svg>
                        <use href={`${sprite}#plus`} />
                      </svg>
                    </button>
                    <p>{quantity}</p>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDecreaseAmount(
                          product._id || product.id,
                          quantity
                        );
                      }}
                    >
                      <svg>
                        <use href={`${sprite}#minus`} />
                      </svg>
                    </button>
                  </div>
                  <button
                    type="button"
                    className={styles.removeBtn}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteProduct(product._id || product.id);
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PreviewCartItems;
