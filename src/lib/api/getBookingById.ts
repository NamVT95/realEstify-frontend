import { axiosClient, handleApiError } from "./config/axiosClient";

export const getBookingById = async (id: number) => {
  try {
    const { data } = await axiosClient.get(`/api/booking/${id}`);
    console.log(data);
    return { error: null, data };
  } catch (error) {
    handleApiError(error);
  }
};
