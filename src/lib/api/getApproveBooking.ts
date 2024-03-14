import { axiosClient, handleApiError } from "./config/axiosClient";

export const getApproveBooking = async (userId: number) => {
  try {
    const { data } = await axiosClient.get("/api/booking");
    const filter = data.data.filter(
      (item: any) => (item.Status as string).toLowerCase() === "approved"
    );
    const filterData = filter.filter((item: any) => {
      return item.Agency.UserId === userId;
    });
    return filterData;
  } catch (error) {
    handleApiError(error);
  }
};
