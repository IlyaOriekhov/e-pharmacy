import { Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { store, persistor } from "./redux/store";
import { setToken } from "./redux/instance";

import Layout from "./components/Layout/Layout";
import PrivateRoute from "./routes/PrivateRoute";
import AutoLogout from "./components/AutoLogout/AutoLogout";
import "react-toastify/dist/ReactToastify.css";

import HomePage from "./pages/HomePage/HomePage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import MedicineStorePage from "./pages/MedicineStorePage/MedicineStorePage";
import MedicinePage from "./pages/MedicinePage/MedicinePage";
import ProductPage from "./pages/ProductPage/ProductPage";
import CartPage from "./pages/CartPage/CartPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

function TokenInitializer() {
  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      setToken(token);
    }

    const handleFocus = () => {
      const currentToken = localStorage.getItem("accessToken");
      if (currentToken) {
        setToken(currentToken);
      }
    };

    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  return null;
}

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <TokenInitializer />
        <AutoLogout />
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="home" element={<HomePage />} />
            <Route path="medicine-store" element={<MedicineStorePage />} />
            <Route path="medicine" element={<MedicinePage />} />
            <Route path="product/:id" element={<ProductPage />} />
            <Route
              path="cart"
              element={
                <PrivateRoute>
                  <CartPage />
                </PrivateRoute>
              }
            />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </PersistGate>
    </Provider>
  );
}

export default App;
