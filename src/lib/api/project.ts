import { axiosClient, handleApiError } from "./config/axiosClient";

export const getProjects = async () => {
  try {
    const { data } = await axiosClient.get(`/api/project`);
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const getProjectById = async (projectId: number) => {
  try {
    const { data } = await axiosClient.get(`/api/project/${projectId}`);
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const createOpenForSale = async (
  projectId: number,
  startTime: string,
  endTime: string
) => {
  try {
    const { data } = await axiosClient.post(`/api/investor/opening-for-sale`, {
      projectId,
      startTime,
      endTime,
    });
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
};
