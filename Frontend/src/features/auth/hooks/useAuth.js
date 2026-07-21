import { useDispatch } from "react-redux";
import { login, register } from "../services/auth.api";

import { setUser } from "../state/auth.slice";

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
  };

  const handleLogin = async ({ email, password }) => {
    const data = await login({ email, password });

    dispatch(setUser(data.user));
  };

  return { handleRegister, handleLogin };
};
