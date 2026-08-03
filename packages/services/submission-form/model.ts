import {z} from "zod"

export const submissionSchema=z.object({
    formId:z.string(),
    answer:z.array(z.object({
        feildId:z.string(),
        value:z.string()
    }))
})

export type SubmissionType = z.infer<typeof submissionSchema>