import React from "react";
import MainBanner from "../../components/Home/MainBanner/MainBanner";
import PromoBanners from "../../components/Home/PromoBanners/PromoBanners";
import NearestStores from "../../components/Home/NearestStores/NearestStores";
import AddPharmacyPromo from "../../components/Home/AddPharmacyPromo/AddPharmacyPromo";
import Reviews from "../../components/Home/Reviews/Reviews";

const HomePage = () => {
  return (
    <>
      <MainBanner />
      <PromoBanners />
      <NearestStores />
      <AddPharmacyPromo />
      <Reviews />
    </>
  );
};

export default HomePage;
