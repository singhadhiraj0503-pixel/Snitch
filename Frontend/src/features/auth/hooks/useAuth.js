import { register } from "../services/auth.api";
import { useDispatch } from "@reduxjs/toolkit";
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

  return { handleRegister };
};
