import { toast } from "react-toastify";
import { axiosClient, handleApiError } from "./config/axiosClient";

export const acceptBooking = async (bookingId: number) => {
  try {
    const { data } = await axiosClient.put(`/api/booking/approve/${bookingId}`);
    console.log(data);
    toast.success(data.response.mes);
    return data;
  } catch (error) {
    handleApiError(error);
    toast.error("Failed to accept booking");
  }
};
