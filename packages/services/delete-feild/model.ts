import {z} from "zod";

export const deleteFieldModel = z.object({
  id: z.string()
}); 
export type DeleteFieldType = z.infer<typeof deleteFieldModel>;