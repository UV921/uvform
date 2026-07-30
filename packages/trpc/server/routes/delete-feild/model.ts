import {z} from "zod"

export const deleteFeildInputModel=z.object({
    id:z.string()
})

export const deleteFeildOutputModel=z.object({
    id:z.string()
})