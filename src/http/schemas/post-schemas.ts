import { z } from 'zod'

export const createPostBodySchema = z.object({
  title: z.string(),
  content: z.string(),
  subject: z.string(),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
  author_id: z.coerce.number().optional(),
})

export const updatePostBodySchema = z.object({
  title: z.string(),
  content: z.string(),
  subject: z.string(),
  author_id: z.coerce.number().optional(),
})

export const postParamsSchema = z.object({
  id: z.string(),
})

export const searchParamsSchema = z.object({
  search: z.string(),
})

export const deleteParamsSchema = z.object({
  id: z.string(),
})

export const findAllParams = z.object({}) // No params for findAll
