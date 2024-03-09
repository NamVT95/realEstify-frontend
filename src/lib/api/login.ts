import { toast } from "react-toastify";
import { axiosClient, handleApiError } from "./config/axiosClient";
import { jwtDecode } from "jwt-decode";
import { User } from "@/store/auth/loginUserSlice";

export const login = async (username: string, password: string) => {
  try {
    const { data } = await axiosClient.post("/api/auth/login", {
      username,
      password,
    });
    console.log(data);
    if (data.token) {
      const decode = jwtDecode(data.token);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(decode));
      toast.success(data.mes);
      return { error: null, data, user: decode as User };
    } else {
      toast.error("An error occurred while logging in");
    }
  } catch (error) {
    if ((error as any)?.response?.data?.mes) {
      toast.error((error as any).response?.data?.mes);
    } else {
      toast.error("An error occurred while logging in");
    }
  }
};
