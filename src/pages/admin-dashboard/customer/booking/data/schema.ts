import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const bookingSchema = z.object({
  id: z.number(),
  ProjectId: z.string().nullish(),
  CustomerId: z.string().nullish(),
  BookingDate: z.string().nullish(),
  SelectionMethod: z.string().nullish(),
  IsSelected: z.boolean().nullish(),
  AgencyId: z.string().nullish(),
  OpeningForSalesDetailsId: z.string().nullish(),
  Status: z.string().nullish(),
})

export type Booking = z.infer<typeof bookingSchema>