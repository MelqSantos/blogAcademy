import zodToJsonSchema from "zod-to-json-schema";
import { PersonCreateSchema, PersonUserIdParamsSchema, PersonRoleParamsSchema} from "../person-schema";


export const personSchemas = {
  personCreate: zodToJsonSchema(PersonCreateSchema),
  personByIdUser: zodToJsonSchema(PersonUserIdParamsSchema),
  personByRole: zodToJsonSchema(PersonRoleParamsSchema),
}