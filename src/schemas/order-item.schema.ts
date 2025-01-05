import { z } from 'zod';
import { bookSchema } from './book.schema';

export const orderItemSchema = z
  .object({
    book: bookSchema,
    quantity: z.number(),
  })
  .required();

export interface OrderItem extends z.infer<typeof orderItemSchema> {}
