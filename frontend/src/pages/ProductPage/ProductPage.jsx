import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getProductById } from "../../redux/pharmacy/operations";
import ProductOverview from "../../components/Product/ProductOverview/ProductOverview";
import TabsContainer from "../../components/Product/TabsContainer/TabsContainer";
import styles from "./ProductPage.module.css";

const ProductPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(getProductById(id));
    }
  }, [dispatch, id]);

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
