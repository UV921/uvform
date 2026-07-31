import {z} from "zod"

export const editformSchema=z.object(
   {
    id:z.string(),
    description:z.string().nullable().optional(),
    title:z.string()
   }

)

export type EditFormType = z.infer<typeof editformSchema>