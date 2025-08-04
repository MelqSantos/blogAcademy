import zodToJsonSchema from "zod-to-json-schema";
import { PersonCreateSchema } from "../person-schema";


export const personSchemas = {
  personCreate: zodToJsonSchema(PersonCreateSchema),
}