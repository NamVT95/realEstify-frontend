import { axiosClient, handleApiError } from "./config/axiosClient";

export const getRejectedBooking = async () => {
    try {
        const { data } = await axiosClient.get("/api/booking");
        const filter = data.data.filter(
            (item: any) => (item.Status as string).toLowerCase() === "rejected"
        );
        return filter;
    } catch (error) {
        handleApiError(error);
    }
};