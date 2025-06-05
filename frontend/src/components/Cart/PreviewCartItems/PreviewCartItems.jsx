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
  const cartItemsQuantity = cart?.cartProducts?.length || 0;

  useEffect(() => {
    dispatch(getCartItems());
  }, [dispatch, cartItemsQuantity]);

  const handleIncreaseAmount = (id) => {
    dispatch(
      addToCart({
        productId: id,
        quantity: 1,
      })
    );
  };

  const handleDecreaseAmount = (id) => {
    dispatch(
      decreaseQuantity({
        productId: id,
        quantity: 1,
      })
    );
  };

  const handleDeleteProduct = (id) => {
    dispatch(deleteFromCart(id));
  };

  const handleProductClick = (id) => {
    dispatch(getProductById(id)).then(() => {
      navigate("/product");
    });
  };

  return (
    <div className={styles.wrapper}>
      <ul className={styles.list}>
        {cart?.cartProducts?.map((product) => (
          <li
            key={product.productId._id}
            className={styles.item}
            onClick={() => handleProductClick(product.productId._id)}
          >
            <div className={styles.imgBox}>
              <img src={product.productId.photo} alt="product" />
            </div>
            <div className={styles.textBox}>
              <div className={styles.mainTextWrap}>
                <div>
                  <h3 className={styles.subtitle}>{product.productId.name}</h3>
                  <p className={styles.text}>{product.productId.category}</p>
                </div>
                <p className={styles.price}>{`৳ ${product.productId.price}`}</p>
              </div>
              <div className={styles.btnBox}>
                <div className={styles.amountBox}>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleIncreaseAmount(product.productId._id);
                    }}
                  >
                    <svg>
                      <use href={`${sprite}#plus`} />
                    </svg>
                  </button>
                  <p>{product.quantity}</p>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDecreaseAmount(product.productId._id);
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
                    handleDeleteProduct(product.productId._id);
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PreviewCartItems;
