// export const bookingSchema = z.object({
//     id: z.number(),
//     ProjectId: z.string().nullish(),
//     CustomerId: z.string().nullish(),
//     BookingDate: z.string().nullish(),
//     SelectionMethod: z.string().nullish(),
//     IsSelected: z.boolean().nullish(),
//     AgencyId: z.string().nullish(),
//     OpeningForSalesDetailsId: z.string().nullish(),
//     Status: z.string().nullish(),
//   })


//Mock data
export const BOOKING_DATA = [
    {
        id: 1,
        ProjectId: "Vinhomes Ocean Park",
        CustomerId: "1",
        BookingDate: "2022-01-01T00:00:00",
        SelectionMethod: "1",
        IsSelected: false,
        OpeningForSalesDetailsId: "1",
        Status: "Chờ xác nhận",
        },
        {
        id: 2,
        ProjectId: "Vinhomes Gia Lâm",
        CustomerId: "2",
        BookingDate: "2022-01-02T00:00:00",
        SelectionMethod: "2",
        IsSelected: false,
        Status: "Chờ xác nhận",
    },
]

export const MOCK_BOOKING_DATA = [
    {
        id: 2,
        ProjectId: "Vinhomes Gia Lâm",
        CustomerId: "2",
        BookingDate: "2022-01-02T00:00:00",
        SelectionMethod: "Trực tiếp",
        IsSelected: true,
        AgencyId: "Nam",
        Status: "Thành công",
    }
]