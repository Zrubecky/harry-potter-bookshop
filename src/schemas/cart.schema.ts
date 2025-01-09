import { z } from 'zod';
import { cartItemSchema } from './cart-item.schema';

export const cartSchema = z
  .object({
    products: z.array(cartItemSchema),
    price: z.number().min(0),
  })
  .required();

export interface Cart extends z.infer<typeof cartSchema> {}
