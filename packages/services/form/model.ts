import {z} from "zod";
export const createFormInput =z.object({
    title:z.string().max(50),
    description:z.string().max(300).optional(),
    createdby:z.uuid()
})
export const listFormByIdInput=z.object({
    userID:z.uuid()
})
export const getFormByIdInput=z.object({
    formId:z.string()
})


export type CreateFormInputType=z.infer<typeof createFormInput>
export type ListFormByIdInputType=z.infer<typeof listFormByIdInput>
export type GetFormByIdInputType=z.infer<typeof getFormByIdInput>