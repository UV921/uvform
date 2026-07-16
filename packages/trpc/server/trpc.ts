import { initTRPC, TRPCError } from "@trpc/server";
import { OpenApiMeta } from "trpc-to-openapi";


import { createContext } from "./context"
import { UserService } from "./services";
import { type Context } from "./context";


export const tRPCContext = initTRPC
  .meta<OpenApiMeta>()//docuemtnaion of get routes and post routes etc
  .context<typeof createContext>()//
  .create({});

export const router = tRPCContext.router;//create router for the tRPC server

export const publicProcedure = tRPCContext.procedure;//create public procedure for the tRPC server
export const protectedProcedure=tRPCContext.procedure.use(async (options)=>{
  const {ctx}=options;
  const userToken=  ctx.getCookie("token");
  if(!userToken){
    throw new TRPCError({
      code:"UNAUTHORIZED",
      message:"User is not authenticated"
    })}
    const {id}=await UserService.verifyAndDecodeToken(userToken!)
    return options.next({
      ctx:{
        ...ctx,
        user:{id}
      }
    
      
    })

    

  })