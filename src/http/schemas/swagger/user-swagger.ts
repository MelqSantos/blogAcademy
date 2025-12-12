import zodToJsonSchema from "zod-to-json-schema";
import { findUserSchema, userCreateSchema, userSigninSchema, userUpdateSchema } from "../user-schema";


export const userSchemas = {
  userSignin: zodToJsonSchema(userSigninSchema),
  userCreate: zodToJsonSchema(userCreateSchema),
  userUpdate: zodToJsonSchema(userUpdateSchema),
  findUser: zodToJsonSchema(findUserSchema),
}