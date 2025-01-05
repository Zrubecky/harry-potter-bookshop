import { z } from 'zod';
import { orderItemSchema } from './order-item.schema';

export const orderSchema = z.object({
  books: z.array(orderItemSchema),
});

export interface Order extends z.infer<typeof orderSchema> {}
