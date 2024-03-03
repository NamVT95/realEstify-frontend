import { axiosClient, handleApiError } from "./config/axiosClient";

export const getPeddingBooking = async () => {
  try {
    const { data } = await axiosClient.get("/api/booking/pending");
    return data;
  } catch (error) {
    handleApiError(error);
  }
};
