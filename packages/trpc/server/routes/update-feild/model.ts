import {z} from "zod";
import { feildTypeEnum } from "../form-feild/model";


const fieldTypeEnum = z.enum(["TEXT", "NUMBER", "EMAIL", "YES_NO", "PASSWORD"]);

export const updateFeildInputModel = z.object({
     id:z.string(),
    label:z.string().max(100).optional(),
    type:fieldTypeEnum.optional(),
    
    description:z.string().optional(),
    placeholder:z.string().optional(),
    isRequired:z.boolean().optional()
    

 })
// .refine(
//     (data)=>
//         data.label !== undefined ||
//         data.type !== undefined ||
//         data.description !== undefined ||
//         data.placeholder !== undefined ||
//         data.isRequired !== undefined,
//         {
//             message:"At least one field must be provided for update",
//         }
// )
export const updateFeildOutputModel=z.object({
     id: z.string(),
        formId: z.uuid().nullable(),
        label: z.string(),
        labelKey: z.string(),
        description: z.string().nullable(),
        placeholder: z.string().nullable(),
        isRequired: z.boolean(),
        index: z.string(),
        type: feildTypeEnum,
        createdAt: z.string().nullable(),
        updatedAt: z.string().nullable(),
    


})