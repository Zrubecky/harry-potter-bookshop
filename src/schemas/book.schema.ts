import { z } from 'zod';

export const bookSchema = z
  .object({
    name: z.string().min(3),
    price: z.number().positive(),
  })
  .required();

export interface Book extends z.infer<typeof bookSchema> {}
