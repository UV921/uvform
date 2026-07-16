import z from "zod";

export const createFormInput = z.object({
    title: z.string().max(50),
    description: z.string().max(300).optional(),
   
})
export const listFormByIdInput = z.undefined()

export const listFormByIdOutput = z.array(z.object({
    id: z.string().describe("ID of the form"),
        title: z.string().describe("Title of the form"),
        description: z.string().nullable().optional().describe("Description of the form"),

        createdAt: z.date().nullable().describe("Creation timestamp"),
        updatedAt: z.date().nullable().describe("Last updated timestamp"),
    
}))
export const createFormOutput = z.object({
    id: z.string()
})