import {z} from "zod"

export const createUserWithEmailAndPassInputModel=z.object({
    fullName:z.string(),
    email:z.email(),
    password:z.string()
})

export const createUserWithEmailAndPassOutputModel=z.object({
    id:z.string()
})