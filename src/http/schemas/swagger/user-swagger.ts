import zodToJsonSchema from "zod-to-json-schema";
import { findUserSchema, userCreateSchema, userSigninSchema } from "../user-schema";


export const userSchemas = {
  userSignin: zodToJsonSchema(userSigninSchema),
  userCreate: zodToJsonSchema(userCreateSchema),
  findUser: zodToJsonSchema(findUserSchema),
}