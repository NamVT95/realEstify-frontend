import { toast } from "react-toastify";
import { axiosClient, handleApiError } from "./config/axiosClient";

export interface sendData {
  ProjectId: number;
  Type: string;
  Floor: number;
  ApartmentNumber: string;
  ShopNumber: number;
  Area: number;
  Price: number;
}

export const createOneProperty = async (sendData: sendData) => {
  try {
    console.log(sendData);
    const { data } = await axiosClient.post(
      "/api/property/create-property",
      sendData
    );
    if (data) {
      toast.success("Property created successfully");
    }
    console.log(data);
  } catch (error) {
    handleApiError(error);
  }
};
