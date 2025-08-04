import { z } from 'zod'

export const PersonCreateSchema = z.object({
  name: z.string(),
  birth: z.coerce.date(),
  email: z.string().email(),
  user_id: z.coerce.number(),
});