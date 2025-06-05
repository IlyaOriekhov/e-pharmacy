import React from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { registerThunk } from "../../../redux/auth/operations";
import { registerSchema } from "../../../schemas/yupSchemas";
import styles from "../SignIn/SignIn.module.css";

const SignUp = ({ onClose, onToggleModal }) => {
  const dispatch = useDispatch();

  const handleToggleModal = () => {
    onClose();
    onToggleModal();
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
    },
    validationSchema: registerSchema,
    onSubmit: (values) => {
      dispatch(registerThunk(values))
        .unwrap()
        .then(() => {
          handleToggleModal();
        });
    },
  });

  return (
    <>
      <h2 className={styles.title}>Sign Up</h2>
      <p className={styles.text}>
        Before proceeding, please register on our site.
      </p>
      <form onSubmit={formik.handleSubmit}>
        <div className={styles.inputBox}>
          <label className={styles.label}>
            <input
              type="text"
              name="name"
              placeholder="User Name"
              onChange={formik.handleChange}
              value={formik.values.name}
              className="input"
            />
            {formik.errors.name && formik.touched.name && (
              <span className="error-text">{formik.errors.name}</span>
            )}
          </label>
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
              type="text"
              name="phone"
              placeholder="Phone number"
              onChange={formik.handleChange}
              value={formik.values.phone}
              className="input"
            />
            {formik.errors.phone && formik.touched.phone && (
              <span className="error-text">{formik.errors.phone}</span>
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
            Sign Up
          </button>
          <button
            type="button"
            className={styles.linkBtn}
            onClick={handleToggleModal}
          >
            Already have an account?
          </button>
        </div>
      </form>
    </>
  );
};

export default SignUp;
