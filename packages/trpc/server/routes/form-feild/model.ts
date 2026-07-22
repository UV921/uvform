import {z} from "zod"

export const feildTypeEnum=z.enum(["TEXT", "NUMBER", "EMAIL", "YES_NO", "PASSWORD"])

export const createFeildInputModel=z.object({
     label:z.string().max(100),
        type:feildTypeEnum,
        formId:z.uuid(),
        description:z.string().optional(),
        placeholder:z.string().optional(),
        isRequired:z.boolean().optional().default(false)
})

export const createFeildOutputModel=z.object({
    id:z.string(),
    labelKey:z.string(),
    index:z.string()
})

export const getFeildInputModel=z.object({
    formId:z.uuid(),

})

export const getFeildOutputModel=z.object({
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

export const getFeildsOutputModel=z.array(getFeildOutputModel)