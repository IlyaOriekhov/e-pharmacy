import React from "react";
import ProductOverview from "../../components/Product/ProductOverview/ProductOverview";
import TabsContainer from "../../components/Product/TabsContainer/TabsContainer";
import styles from "./ProductPage.module.css";

const ProductPage = () => {
  return (
    <section>
      <div className={styles.container}>
        <ProductOverview />
        <TabsContainer />
      </div>
    </section>
  );
};

export default ProductPage;
