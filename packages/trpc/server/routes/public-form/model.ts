import {success, z} from "zod"

export const fieldTypeEnum=z.enum(["TEXT", "NUMBER", "EMAIL", "YES_NO", "PASSWORD"])
export const getFormFeildInputModel=z.object({
    formId:z.string()
})
export const getFormFeildOutputModel=z.object({
    form: z.object({
        id: z.string(),
        title: z.string(),
        description: z.string().nullable(),
      }),
    
      fields: z.array(
        z.object({
          id: z.string(),
          label: z.string(),
          description: z.string().nullable(),
          placeholder: z.string().nullable(),
          type: fieldTypeEnum,
          isRequired: z.boolean(),
          index: z.string(),
        }),
      ),
  
})


export const submitFormInputModel=z.object({
    formId:z.string(),
    answer:z.array(z.object({
        feildId:z.string(),
        value:z.string()
    }))

})

export const submitFormOutputModel=z.object({
    success:z.boolean(),
    submissionId:z.string()
})