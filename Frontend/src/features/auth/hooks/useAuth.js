import { useDispatch } from "react-redux";
import { getMe, login, register } from "../services/auth.api";

import { setLoading, setUser } from "../state/auth.slice";

export const useAuth = () => {
  const dispatch = useDispatch();

  const handleRegister = async ({
    email,
    contact,
    password,
    fullname,
    isSeller = false,
  }) => {
    const data = await register({
      email,
      contact,
      password,
      fullname,
      isSeller,
    });

    dispatch(setUser(data.user));
    return data.user;
  };

  const handleLogin = async ({ email, password }) => {
    const data = await login({ email, password });

    dispatch(setUser(data.user));
    return data.user;
  };

  const handleGetMe = async () => {
    try {
      dispatch(setLoading(true));
      const data = await getMe();
      dispatch(setUser(data.user));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return { handleRegister, handleLogin, handleGetMe };
};
