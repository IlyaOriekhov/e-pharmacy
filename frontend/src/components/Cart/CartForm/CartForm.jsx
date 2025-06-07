import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { selectCart } from "../../../redux/pharmacy/selectors";
import { cartCheckout } from "../../../redux/pharmacy/operations";
import { orderSchema } from "../../../schemas/yupSchemas";
import styles from "./CartForm.module.css";

const CartForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector(selectCart);
  const total = Number(cart?.total).toFixed(2) || 0;
  const [isCashPayment, setIsCashPayment] = useState(true);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      paymentMethod: "Cash On Delivery",
    },
    validationSchema: orderSchema,
    onSubmit: (values) => {
     

      if (!cart || !cart.cartProducts || cart.cartProducts.length === 0) {
        toast.error("Please select product to make an order");
        return;
      }

      const orderData = {
        name: values.name.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
        address: values.address.trim(),
        paymentMethod: isCashPayment ? "Cash On Delivery" : "Bank",
      };

      dispatch(cartCheckout(orderData))
        .unwrap()
        .then(() => {
          navigate("/home");
        })
        .catch((error) => {
          console.error("Checkout error:", error);
        });
    },
  });

  const handlePaymentChange = (isCash) => {
    setIsCashPayment(isCash);
    formik.setFieldValue("paymentMethod", isCash ? "Cash On Delivery" : "Bank");
  };

  return (
    <form onSubmit={formik.handleSubmit} className={styles.form}>
      <h3 className={styles.subTitle}>Enter shipping info</h3>
      <p className={styles.text}>
        Enter your delivery address where you get the product. You can also send
        any other location where you send the products.
      </p>
      <div className={styles.inputBox}>
        <label className={styles.label}>
          Name
          <input
            type="text"
            name="name"
            placeholder="Enter text"
            onChange={formik.handleChange}
            value={formik.values.name}
            className="input"
          />
          {formik.errors.name && formik.touched.name && (
            <span className="error-text">{formik.errors.name}</span>
          )}
        </label>
        <label className={styles.label}>
          Email
          <input
            type="text"
            name="email"
            placeholder="Enter text"
            onChange={formik.handleChange}
            value={formik.values.email}
            className="input"
          />
          {formik.errors.email && formik.touched.email && (
            <span className="error-text">{formik.errors.email}</span>
          )}
        </label>
        <label className={styles.label}>
          Phone
          <input
            type="text"
            name="phone"
            placeholder="Enter text"
            onChange={formik.handleChange}
            value={formik.values.phone}
            className="input"
          />
          {formik.errors.phone && formik.touched.phone && (
            <span className="error-text">{formik.errors.phone}</span>
          )}
        </label>
        <label className={styles.label}>
          Address
          <input
            type="text"
            name="address"
            placeholder="Enter text"
            onChange={formik.handleChange}
            value={formik.values.address}
            className="input"
          />
          {formik.errors.address && formik.touched.address && (
            <span className="error-text">{formik.errors.address}</span>
          )}
        </label>
      </div>

      <div className={styles.paymentBox}>
        <h3 className={styles.subTitle}>Payment method</h3>
        <p className={styles.text}>
          You can pay us in a multiple way in our payment gateway system.
        </p>
        <div className={styles.radioBox}>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="paymentMethod"
              checked={isCashPayment}
              onChange={() => handlePaymentChange(true)}
            />
            Cash On Delivery
          </label>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="paymentMethod"
              checked={!isCashPayment}
              onChange={() => handlePaymentChange(false)}
            />
            Bank
          </label>
          {formik.errors.paymentMethod && formik.touched.paymentMethod && (
            <span className="error-text">{formik.errors.paymentMethod}</span>
          )}
        </div>
      </div>

      <div className={styles.orderBox}>
        <h3 className={styles.subTitle}>Order details</h3>
        <p className={styles.text}>
          Shipping and additionnal costs are calculated based on values you have
          entered.
        </p>
        <div className={styles.totalBox}>
          <p>Total:</p>
          <p>{`৳ ${total}`}</p>
        </div>
      </div>

      <button type="submit" className={`btn-primary ${styles.submitBtn}`}>
        Place order
      </button>
    </form>
  );
};

export default CartForm;
