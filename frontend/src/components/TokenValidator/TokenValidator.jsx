import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn, selectToken } from "../../redux/auth/selectors";
import { getUserInfoThunk, logoutThunk } from "../../redux/auth/operations";

const TokenValidator = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const token = useSelector(selectToken);

  useEffect(() => {
    const validateToken = async () => {
      const storedToken = localStorage.getItem("accessToken");

      if (isLoggedIn && (token || storedToken)) {
        try {
          await dispatch(getUserInfoThunk()).unwrap();
        } catch (error) {
          console.error(error);
          dispatch(logoutThunk());
        }
      }
    };

    validateToken();

    const interval = setInterval(validateToken, 30000);

    return () => clearInterval(interval);
  }, [dispatch, isLoggedIn, token]);

  return null;
};

export default TokenValidator;
