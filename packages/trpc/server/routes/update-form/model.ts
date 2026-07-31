import {z} from "zod"

export const updateFormInputModel=z.object({
    id:z.string(),
    title:z.string(),
    description:z.string().nullable()
})

export const updateFormOutputMdoel=z.object({
    id: z.string().describe("ID of the form"),
        title: z.string().describe("Title of the form"),
        description: z.string().nullable().optional().describe("Description of the form"),

        createdAt: z.date().nullable().describe("Creation timestamp"),
        updatedAt: z.date().nullable().describe("Last updated timestamp"),
    
})