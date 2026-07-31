import {z} from "zod"

export const deleteFormSchema=z.object({
    id:z.string()
})
export type DeleteFormPayload=z.infer<typeof deleteFormSchema>