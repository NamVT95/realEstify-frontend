import { toast } from "react-toastify";
import { axiosClient, handleApiError } from "./config/axiosClient";
import { jwtDecode } from "jwt-decode";

export const login = async (username: string, password: string) => {
  try {
    const { data } = await axiosClient.post("/api/auth/login", {
      username,
      password,
    });
    console.log(data);
    const decode = jwtDecode(data.token);
    console.log(JSON.stringify(decode));
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(decode));
    return { error: null, data, user: decode };
  } catch (error) {
    console.log(error);
    toast.error("An error occurred while logging in");
  }
};
