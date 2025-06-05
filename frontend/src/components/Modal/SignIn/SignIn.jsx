import React from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { loginThunk } from "../../../redux/auth/operations";
import { loginSchema } from "../../../schemas/yupSchemas";
import styles from "./SignIn.module.css";

const SignIn = ({ onClose, onToggleModal }) => {
  const dispatch = useDispatch();

  const handleToggleModal = () => {
    onClose();
    onToggleModal();
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      dispatch(loginThunk(values));
      onClose();
    },
  });

  return (
    <>
      <h2 className={styles.title}>Log in to your account</h2>
      <p className={styles.text}>
        Please login to your account before continuing.
      </p>
      <form onSubmit={formik.handleSubmit}>
        <div className={styles.inputBox}>
          <label className={styles.label}>
            <input
              type="text"
              name="email"
              placeholder="Email address"
              onChange={formik.handleChange}
              value={formik.values.email}
              className="input"
            />
            {formik.errors.email && formik.touched.email && (
              <span className="error-text">{formik.errors.email}</span>
            )}
          </label>
          <label className={styles.label}>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={formik.handleChange}
              value={formik.values.password}
              className="input"
            />
            {formik.errors.password && formik.touched.password && (
              <span className="error-text">{formik.errors.password}</span>
            )}
          </label>
        </div>
        <div className={styles.btnBox}>
          <button type="submit" className={`btn-primary ${styles.submitBtn}`}>
            Log in
          </button>
          <button
            type="button"
            className={styles.linkBtn}
            onClick={handleToggleModal}
          >
            Don't have an account?
          </button>
        </div>
      </form>
    </>
  );
};

export default SignIn;
