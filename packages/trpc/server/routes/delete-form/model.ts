import { z } from "zod";

export const deleteFormInputModel=z.object({
    id:z.string()
})
export const deleteFormOutputModel=z.object({
    id:z.string()
})