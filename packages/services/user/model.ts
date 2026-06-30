import {z} from "zod"

export const createUserWithEmailAndPassword=z.object({

    fullName:z.string().describe("user full name"),
    email:z.email(),
    password:z.string()
})
export const generateUserTokenPaylod=z.object({
    id:z.string()

})

export const signInUserWithEmailandPass=z.object({
    email:z.email(),
    password:z.string(),
})


export type CreateUserWithEmailAndPassword=z.infer<typeof createUserWithEmailAndPassword>
export type GenerateUserTokenPaylod =z.infer<typeof generateUserTokenPaylod>
export type SignInUserWithEmailandPass=z.infer< typeof signInUserWithEmailandPass>
