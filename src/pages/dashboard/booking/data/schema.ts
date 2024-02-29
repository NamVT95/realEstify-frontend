import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const bookingSchema = z.object({
  id: z.number(),
  bookingDate: z.string(),
  paymentMethod: z.string().nullish(),
  status: z.boolean(),
  user: z.any(),
  notes: z.string().nullish(),
})

export type Booking = z.infer<typeof bookingSchema>