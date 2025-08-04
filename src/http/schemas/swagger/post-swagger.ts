import zodToJsonSchema from "zod-to-json-schema";
import { createPostBodySchema, deleteParamsSchema, findAllParams, postParamsSchema, searchParamsSchema, updatePostBodySchema } from "../post-schemas";


export const postSchemas = {
  createPostBody: zodToJsonSchema(createPostBodySchema),
  postParams: zodToJsonSchema(postParamsSchema),
  searchParams: zodToJsonSchema(searchParamsSchema),
  updatePostBody: zodToJsonSchema(updatePostBodySchema),
  deleteParams: zodToJsonSchema(deleteParamsSchema),
  findAllParams: zodToJsonSchema(findAllParams), // No params for findAll
}
