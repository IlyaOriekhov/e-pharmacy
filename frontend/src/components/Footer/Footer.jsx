// import React from "react";
// import { useMediaQuery } from "react-responsive";
// import Logo from "./Logo/Logo";
// import NavLinks from "./NavLinks/NavLinks";
// import SocialMediaIcons from "./SocialMediaIcons/SocialMediaIcons";
// import Bottom from "./Bottom/Bottom";
// import styles from "./Footer.module.css";

// const Footer = () => {
//   const isTabletOrDesktop = useMediaQuery({
//     query: "(min-width: 768px)",
//   });

//   return (
//     <footer>
//       <div className={styles.container}>
//         <div className={styles.mainWrapper}>
//           <div className={styles.textWrapper}>
//             <Logo />
//             <p className={styles.text}>
//               Get the medicine to help you feel better, get back to your active
//               life, and enjoy every moment.
//             </p>
//           </div>
//           <div className={styles.linksWrapper}>
//             <NavLinks />
//             {isTabletOrDesktop && <SocialMediaIcons />}
//           </div>
//         </div>
//         <Bottom />
//       </div>
//     </footer>
//   );
// };

// export default Footer;

// frontend/src/components/Footer/Footer.jsx
import React from "react";
import { useMediaQuery } from "react-responsive";
import Logo from "./Logo/Logo";
import NavLinks from "./NavLinks/NavLinks";
import SocialMediaIcons from "./SocialMediaIcons/SocialMediaIcons";
import Bottom from "./Bottom/Bottom";
import styles from "./Footer.module.css";

const Footer = () => {
  const isTabletOrDesktop = useMediaQuery({
    query: "(min-width: 768px)",
  });

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.mainWrapper}>
          <div className={styles.textWrapper}>
            <Logo />
            <p className={styles.text}>
              Get the medicine to help you feel better, get back to your active
              life, and enjoy every moment.
            </p>
          </div>
          <div className={styles.linksWrapper}>
            <NavLinks />
            {isTabletOrDesktop && <SocialMediaIcons />}
          </div>
        </div>
        <Bottom />
      </div>
    </footer>
  );
};

export default Footer;
