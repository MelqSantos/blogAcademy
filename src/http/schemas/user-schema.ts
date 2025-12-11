import { z } from 'zod'

export const userSigninSchema = z.object({
  username: z.string(),
  password: z.string()
});

export const userCreateSchema = z.object({
  username: z.string(),
  password: z.string(),
  role: z.string(),
  name: z.string(),
  birth: z.string(),
  email: z.string().email(),
});

export const findUserSchema = z.object({
  id: z.coerce.number()
});