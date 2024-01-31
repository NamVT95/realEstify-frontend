import { axiosClient, handleApiError } from "./config/axiosClient";

export const getProperties = async () => {
  try {
    const { data } = await axiosClient.get(`/api/property`);
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const getPropertyById = async (propertyId: number) => {
  try {
    const { data } = await axiosClient.get(`/api/property/${propertyId}`);
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
};
