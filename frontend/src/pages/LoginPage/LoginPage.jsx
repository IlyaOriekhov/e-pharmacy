// import React from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import { useFormik } from "formik";
// import { useDispatch } from "react-redux";
// import { useMediaQuery } from "react-responsive";
// import { loginThunk } from "../../redux/auth/operations";
// import { loginSchema } from "../../schemas/yupSchemas";
// import Logo from "../../components/Header/Logo/Logo";
// import styles from "./LoginPage.module.css";
// import { useEffect } from "react";
// import { clearToken } from "../../redux/instance";

// import pillMob1x from "../../assets/images/mob/pill_mob@1x.png";
// import pillMob2x from "../../assets/images/mob/pill_mob@2x.png";
// import pillTabDesk1x from "../../assets/images/desk/pill_tab_desk@1x.png";
// import pillTabDesk2x from "../../assets/images/desk/pill_tab_desk@2x.png";

// const LoginPage = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
//   const isTabletOrDesktop = useMediaQuery({ query: "(min-width: 768px)" });

//   useEffect(() => {
//     clearToken();
//     localStorage.removeItem("refreshToken");
//     localStorage.removeItem("accessToken");
//   }, []);

//   const formik = useFormik({
//     initialValues: {
//       email: "",
//       password: "",
//     },
//     validationSchema: loginSchema,
//     onSubmit: (values) => {
//       dispatch(loginThunk(values))
//         .unwrap()
//         .then(() => {
//           navigate("/medicine-store");
//         });
//     },
//   });

//   return (
//     <div className={styles.container}>
//       <div className={styles.logoWrapper}>
//         <Logo />
//       </div>
//       <div className={styles.mainWrapper}>
//         <div className={styles.titleBox}>
//           <h2 className={styles.title}>
//             Your medication, delivered Say goodbye to all{" "}
//             <span className={styles.titleSpan}>your healthcare</span> worries
//             with us
//           </h2>
//           <div className={styles.imgWrapper}>
//             {isMobile && (
//               <img srcSet={`${pillMob1x} 1x, ${pillMob2x} 2x`} alt="Pill" />
//             )}
//             {isTabletOrDesktop && (
//               <img
//                 srcSet={`${pillTabDesk1x} 1x, ${pillTabDesk2x} 2x`}
//                 alt="Pill"
//               />
//             )}
//           </div>
//         </div>
//         <form onSubmit={formik.handleSubmit}>
//           <div className={styles.inputBox}>
//             <label className={styles.label}>
//               <input
//                 type="text"
//                 placeholder="Email address"
//                 name="email"
//                 onChange={formik.handleChange}
//                 value={formik.values.email.trim()}
//                 className="input"
//               />
//               {formik.errors.email && formik.touched.email && (
//                 <span className="error-text">{formik.errors.email}</span>
//               )}
//             </label>
//             <label className={styles.label}>
//               <input
//                 type="password"
//                 placeholder="Password"
//                 name="password"
//                 onChange={formik.handleChange}
//                 value={formik.values.password.trim()}
//                 className="input"
//               />
//               {formik.errors.password && formik.touched.password && (
//                 <span className="error-text">{formik.errors.password}</span>
//               )}
//             </label>
//           </div>
//           <div className={styles.btnBox}>
//             <button type="submit" className={`btn-primary ${styles.submitBtn}`}>
//               Login
//             </button>
//             <NavLink to="/register" className={styles.navLink}>
//               Don't have an account?
//             </NavLink>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;

import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { loginThunk } from "../../redux/auth/operations";
import { loginSchema } from "../../schemas/yupSchemas";
import Logo from "../../components/Header/Logo/Logo";
import styles from "./LoginPage.module.css";
import { useEffect } from "react";
import { clearToken } from "../../redux/instance";

import pillMob1x from "../../assets/images/mob/pill_mob@1x.png";
import pillMob2x from "../../assets/images/mob/pill_mob@2x.png";
import pillTabDesk1x from "../../assets/images/desk/pill_tab_desk@1x.png";
import pillTabDesk2x from "../../assets/images/desk/pill_tab_desk@2x.png";
import sprite from "../../assets/icons/sprite.svg";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const isTabletOrDesktop = useMediaQuery({ query: "(min-width: 768px)" });

  useEffect(() => {
    clearToken();
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("accessToken");
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      dispatch(loginThunk(values))
        .unwrap()
        .then(() => {
          navigate("/medicine-store");
        });
    },
  });

  return (
    <div className={styles.container}>
      <div className={styles.logoWrapper}>
        <Logo />
      </div>
      <div className={styles.mainWrapper}>
        <div className={styles.titleBox}>
          <h2 className={styles.title}>
            Your medication, delivered Say goodbye to all{" "}
            <span className={styles.titleSpan}>your healthcare</span> worries
            with us
          </h2>
          <div className={styles.imgWrapper}>
            {isMobile && (
              <img srcSet={`${pillMob1x} 1x, ${pillMob2x} 2x`} alt="Pill" />
            )}
            {isTabletOrDesktop && (
              <img
                srcSet={`${pillTabDesk1x} 1x, ${pillTabDesk2x} 2x`}
                alt="Pill"
              />
            )}
          </div>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className={styles.inputBox}>
            <label className={styles.label}>
              <input
                type="text"
                placeholder="Email address"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email.trim()}
                className="input"
              />
              {formik.errors.email && formik.touched.email && (
                <span className="error-text">{formik.errors.email}</span>
              )}
            </label>
            <label className={styles.label}>
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password.trim()}
                className="input"
              />
              {formik.errors.password && formik.touched.password && (
                <span className="error-text">{formik.errors.password}</span>
              )}
            </label>
          </div>
          <div className={styles.btnBox}>
            <button type="submit" className={`btn-primary ${styles.submitBtn}`}>
              Login
            </button>
            <NavLink to="/register" className={styles.navLink}>
              Don't have an account?
            </NavLink>
          </div>
        </form>
      </div>

      {/* Елементи в правому нижньому куті */}
      <div className={styles.elementsWrapper}>
        <svg className={styles.elementsImg}>
          <use href={`${sprite}#elements`} />
        </svg>
      </div>
    </div>
  );
};

export default LoginPage;
