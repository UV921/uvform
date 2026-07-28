import {z} from "zod";


const fieldTypeEnum = z.enum(["TEXT", "NUMBER", "EMAIL", "YES_NO", "PASSWORD"]);

export const updateFeildInput=z.object({
    id:z.string(),
    label:z.string().max(100).optional(),
    type:fieldTypeEnum.optional(),
    
    description:z.string().optional(),
    placeholder:z.string().optional(),
    isRequired:z.boolean().optional()
    

}).refine(
    (data)=>
        data.label !== undefined ||
        data.type !== undefined ||
        data.description !== undefined ||
        data.placeholder !== undefined ||
        data.isRequired !== undefined,
        {
            message:"At least one field must be provided for update",
        }
)

export type UpdateFeildInput=z.infer<typeof updateFeildInput>