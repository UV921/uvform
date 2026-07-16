import { publicProcedure, router ,protectedProcedure} from "../../trpc";
import {
  createUserWithEmailAndPassInputModel,
  createUserWithEmailAndPassOutputModel,
  signInUserWithEmailandPassInputModel,
  signInUserWithEmailandPassOutputModel,
  getUserInputModel,
  getUserOutputModel,

} from "./model";
import { generatePath } from "../../utils/path-generator";
import { UserService } from "../../services";


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
    signInUserWithEmailandPass:publicProcedure.meta({
        
      openapi: {
        method: "POST",
        path: getPath("/signInUserWithEmailandPass"),
        tags: TAGS,
      }
        
    }).input(signInUserWithEmailandPassInputModel).output(signInUserWithEmailandPassOutputModel)
    .mutation(async({input,ctx})=>{
        const {email,password}=input;
       const{id,token}= await UserService.signInUserWithEmailandPass({email,password});

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
getUser:protectedProcedure.meta( {
      openapi: {
        method: "POST",
        path: getPath("/getUser"),
        tags: TAGS,
      } }).input(getUserInputModel).output(getUserOutputModel).query(async ({ctx})=>{
        const {id,fullName,email} =await UserService.getUserById(ctx.user.id)
        return{
          id,
          fullName,
          email
        }
       
       
       
     

}),
   
});
