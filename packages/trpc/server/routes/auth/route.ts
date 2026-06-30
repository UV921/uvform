import { publicProcedure, router } from "../../trpc";
import {
  createUserWithEmailAndPassInputModel,
  createUserWithEmailAndPassOutputModel,
} from "./model";
import { generatePath } from "../../utils/path-generator";
import { UserService } from "../../services";
import userService from "@repo/services/user";
const getPath = generatePath("/auth");
const TAGS = ["AUTHENTICATION"];

export const authRouter = router({
  createUserWithEmailAndPassword: publicProcedure
    .meta({
      openapi: {
        method: "POST",
        path: getPath("/createUserWithEmailAndPassword"),
        tags: TAGS,
      },
    })
    .input(createUserWithEmailAndPassInputModel)
    .output(createUserWithEmailAndPassOutputModel)
    .mutation(async({input,ctx})=>{
        const {fullName,email,password}=input;
       const{id,token}= await UserService.createUserWithEmailAndPassword({fullName,email,password});

       ctx.setCookie("token",token,{
        httpOnly:true,
        secure:false,
        sameSite:"strict",
        maxAge:30*24*60*60*1000
       })


       return {
        id
       }





    }),
});
