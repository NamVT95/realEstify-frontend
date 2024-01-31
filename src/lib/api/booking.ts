import { axiosClient, handleApiError } from "./config/axiosClient";

interface BookingBody {
  propertyId: number;
  email: string;
  phone: string;
  deposit: number;
}

export const postBookingProperties = async (bookingData: BookingBody) => {
  try {
    const { data } = await axiosClient.post(
      `/api/booking/sendDeposit`,
      bookingData
    );
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
};
