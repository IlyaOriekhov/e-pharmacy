import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  addToCart,
  cartCheckout,
  decreaseQuantity,
  deleteFromCart,
  getAllStores,
  getCartItems,
  getCustomerReviews,
  getNearestStores,
  getProductById,
  getSearchProducts,
} from "./operations";

const initialState = {
  stores: [],
  nearestStores: [],
  reviews: [],
  products: [],
  product: null,
  cart: [],
  currentPage: 1,
  totalPages: null,
  totalProducts: null,
  isLoading: false,
  error: null,
};

export const slice = createSlice({
  name: "pharmacy",
  initialState,
  reducers: {
    setCurrentPage: (state, { payload }) => {
      state.currentPage = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCustomerReviews.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.reviews = payload;
      })
      .addCase(getNearestStores.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.nearestStores = payload;
      })
      .addCase(getAllStores.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.stores = payload;
      })
      .addCase(getSearchProducts.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.products = payload.products;
        state.currentPage = payload.currentPage;
        state.totalPages = payload.totalPages;
        state.totalProducts = payload.totalProducts;
      })
      .addCase(getProductById.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.product = payload;
      })
      .addCase(getCartItems.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.cart = payload;
      })
      .addCase(cartCheckout.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.cart = payload;
      })
      .addCase(deleteFromCart.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.cart = payload;
      })
      .addCase(addToCart.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.cart = payload;
      })
      .addCase(decreaseQuantity.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.cart = payload;
      })
      .addMatcher(
        isAnyOf(
          getCustomerReviews.pending,
          getNearestStores.pending,
          getAllStores.pending,
          getSearchProducts.pending,
          getProductById.pending,
          getCartItems.pending,
          cartCheckout.pending,
          deleteFromCart.pending,
          addToCart.pending,
          decreaseQuantity.pending
        ),
        (state) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(
          getCustomerReviews.rejected,
          getNearestStores.rejected,
          getAllStores.rejected,
          getSearchProducts.rejected,
          getProductById.rejected,
          getCartItems.rejected,
          cartCheckout.rejected,
          deleteFromCart.rejected,
          addToCart.rejected,
          decreaseQuantity.rejected
        ),
        (state, { payload }) => {
          state.isLoading = false;
          state.error = payload;
        }
      );
  },
});

export const { setCurrentPage } = slice.actions;
export const pharmacyReducer = slice.reducer;
