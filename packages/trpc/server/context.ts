import { CookieOptions } from "express";
import {setCookie as setCookieUtils,getCookie as getCookieUtils,clearCookie as clearCookieUtils} from "./utils/cookie"
import type {CreateExpressContextOptions} from "@trpc/server/adapters/express"
export interface TrpcContext{
    setCookie:(name:string,value:string,opts:CookieOptions)=>void;
     getCookie:(name:string)=> string |undefined;
    clearCookie:(name:string)=>void;
    user?:TrpcContext

}
export interface TrpcCtxUser{
    id:string;
}


export async function createContext({req,res}:CreateExpressContextOptions) {
    const ctx:TrpcContext={
        setCookie(name:string,value:string,opts:CookieOptions){
            return setCookieUtils(res,name,value,opts)
        },
        getCookie(name) {
            return getCookieUtils(req,name)
        },
        clearCookie(name) {
            return clearCookieUtils(res,name)
        },

        user:undefined,
        
    }
    return ctx;

}
export type Context = Awaited<ReturnType<typeof createContext>>;
