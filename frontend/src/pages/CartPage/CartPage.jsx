import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCartItems } from "../../redux/pharmacy/operations";
import CartForm from "../../components/Cart/CartForm/CartForm";
import PreviewCartItems from "../../components/Cart/PreviewCartItems/PreviewCartItems";
import styles from "./CartPage.module.css";

const CartPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartItems());
  }, [dispatch]);

  return (
    <section>
      <div className={styles.container}>
        <h2 className={styles.title}>Cart</h2>
        <div className={styles.mainWrapper}>
          <CartForm />
          <PreviewCartItems />
        </div>
      </div>
    </section>
  );
};

export default CartPage;
