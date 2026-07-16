import {z} from "zod"

export const createUserWithEmailAndPassInputModel=z.object({
    fullName:z.string(),
    email:z.email(),
    password:z.string()
})

export const createUserWithEmailAndPassOutputModel=z.object({
    id:z.string()
})

export const   signInUserWithEmailandPassInputModel=z.object({
    email:z.email(),
    password:z.string(),
})
export const signInUserWithEmailandPassOutputModel=z.object({
    id:z.string()
})
export const getUserOutputModel=z.object({
    id:z.string(),
    fullName:z.string(),
    email:z.email()
})
export const getUserInputModel=z.undefined()
