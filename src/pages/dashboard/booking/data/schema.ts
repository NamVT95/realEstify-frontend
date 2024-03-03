import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const bookingSchema = z.object({
  BookingId: z.number(),
  ProjectId: z.any().nullish(),
  Customer: z.any().nullish(),
  BookingDate: z.string().nullish(),
  SelectionMethod: z.string().nullish(),
  IsSelected: z.boolean().nullish(),
  AgencyId: z.string().nullish(),
  OpeningForSalesDetailsId: z.string().nullish(),
  Status: z.any().nullish(),
  AmountDeposit: z.number().nullish(),
});

export type Booking = z.infer<typeof bookingSchema>;
