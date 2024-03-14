import { axiosClient, handleApiError } from "./config/axiosClient";

export const getPeddingBooking = async (userid: number) => {
  try {
    const { data } = await axiosClient.get("/api/booking/pending");
    const filterData = data.response.data.filter((item: any) => {
      return item.Agency.UserId === userid;
    });
    return filterData;
  } catch (error) {
    handleApiError(error);
  }
};
