import axios from "axios";
import { axiosClient, handleApiError } from "./config/axiosClient";
import { toast } from "react-toastify";

export const rejectBooking = async (id: string) => {
  try {
    const response = await axiosClient.put(`/api/booking/reject/${id}`);
    const data = response.data;
    console.log(data);
    if (data?.response?.status === 200) {
      toast.success(data?.response?.mes);
      return data;
    } else {
      toast.error("Error rejecting booking");
      return null;
    }
  } catch (error) {
    handleApiError(error);
  }
};
