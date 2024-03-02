import { toast } from "react-toastify";
import { axiosClient, handleApiError } from "./config/axiosClient";

export const login = async (username: string, password: string) => {
  try {
    const { data } = await axiosClient.post("/api/auth/login", {
      username,
      password,
    });
    console.log(data);
    localStorage.setItem("token", data.response.token);
    return { error: null, data };
  } catch (error) {
    console.log(error);
    toast.error("An error occurred while logging in");
  }
};
