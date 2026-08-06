import { z } from "zod"



export const getPublicFormByIdInput=z.object({
    formId:z.string()
})

export type GetPublicFormByIdInputType=z.infer<typeof getPublicFormByIdInput>