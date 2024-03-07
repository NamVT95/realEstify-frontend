import { axiosClient, handleApiError } from "./config/axiosClient";

interface IRegister {
  username: string;
  password: string;
  fullname: string;
  phone: string;
  address: string;
  email: string;
}

export const register = async (registdata: IRegister) => {
  try {
    const { data } = await axiosClient.post("/api/auth/register", registdata);
    return data;
  } catch (error) {
    handleApiError(error);
  }
};
