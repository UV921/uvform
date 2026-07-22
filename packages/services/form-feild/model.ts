import { Placeholder } from "@repo/database";
import {z} from "zod";
//isme ham input zod valdiation banyege and 

const fieldTypeEnum = z.enum(["TEXT", "NUMBER", "EMAIL", "YES_NO", "PASSWORD"]);

export const createFeildInput=z.object({
    label:z.string().max(100),
    type:fieldTypeEnum,
    formId:z.uuid(),
    description:z.string().optional(),
    placeholder:z.string().optional(),
    isRequired:z.boolean().optional().default(false)

})
export const getFeildInput=z.object({
    formId:z.uuid()
})

export type createFeildInputType=z.infer<typeof createFeildInput>
export type getFeildInputType=z.infer<typeof getFeildInput>