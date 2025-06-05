import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <div className={styles.notFoundContainer}>
      <div className={styles.contentContainer}>
        <h1 className={styles.errorCode}>404</h1>
        <h2 className={styles.errorTitle}>Page Not Found</h2>
        <p className={styles.errorMessage}>
          The page you are looking for doesn't exist or has been moved.
        </p>

        <div className={styles.actionButtons}>
          <Link to="/" className={styles.homeButton}>
            Go to Home
          </Link>
          <Link to="/medicine-store" className={styles.storesButton}>
            Browse Stores
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
