import { z } from 'zod';
import { bookSchema } from './book.schema';

export const cartItemSchema = z
  .object({
    book: bookSchema,
    quantity: z.number(),
  })
  .required();

export interface CartItem extends z.infer<typeof cartItemSchema> {}
