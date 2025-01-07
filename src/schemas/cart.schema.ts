import { z } from 'zod';
import { cartItemSchema } from './cart-item.schema';

export const cartSchema = z.object({
  products: z.array(cartItemSchema),
});

export interface Cart extends z.infer<typeof cartSchema> {}
