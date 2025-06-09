import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { logoutThunk } from "../../redux/auth/operations";
import { clearToken } from "../../redux/instance";
import instance from "../../redux/instance";

const AutoLogout = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    const forceLogout = () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("persist:auth");
      clearToken();

      dispatch(logoutThunk());

      setTimeout(() => {
        window.location.reload();
      }, 100);
    };

    const checkTokenValidity = async () => {
      if (isLoggedIn) {
        const token = localStorage.getItem("accessToken");

        if (!token) {
          forceLogout();
          return;
        }

        try {
          await instance.get("/user/user-info");
        } catch (error) {
          if (error.response?.status === 401) {
            forceLogout();
          }
        }
      }
    };

    checkTokenValidity();

    const handleFocus = () => {
      checkTokenValidity();
    };

    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, [dispatch, isLoggedIn]);

  return null;
};

export default AutoLogout;
