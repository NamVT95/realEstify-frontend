import { axiosClient, handleApiError } from "./config/axiosClient";

export const getApproveBooking = async () => {
  try {
    const { data } = await axiosClient.get("/api/booking");
    const filter = data.data.filter(
      (item: any) => (item.Status as string).toLowerCase() === "approved"
    );
    return filter;
  } catch (error) {
    handleApiError(error);
  }
};
