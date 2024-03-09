import { axiosClient, handleApiError } from "./config/axiosClient";

export const getPropertyByProId = async (id: number) => {
  try {
    const { data } = await axiosClient.get(
      `/api/property/${id}/list-property-by-projectId`
    );
    return data;
  } catch (error) {
    handleApiError(error);
  }
};
