import { axiosClient, handleApiError } from "./config/axiosClient";

interface BookingBody {
  projectId: number;
  customerId: number;
  agencyId: number;
  selectionMethod: string;
  AmountDeposit: number;
}

export const postBookingProperties = async (bookingData: BookingBody) => {
  try {
    const { data } = await axiosClient.post(
      `/api/booking/deposit`,
      bookingData
    );
    console.log(data);
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
};
