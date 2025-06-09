import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { logoutThunk } from "../../redux/auth/operations";
import instance from "../../redux/instance";

const AutoLogout = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    const checkTokenValidity = async () => {
      if (isLoggedIn) {
        const token = localStorage.getItem("accessToken");

        if (!token) {
          dispatch(logoutThunk());
          return;
        }

        try {
          await instance.get("/user/user-info");
        } catch (error) {
          if (error.response?.status === 401) {
            dispatch(logoutThunk());
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
