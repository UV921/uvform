import { FeildService } from "../../services";
import { protectedProcedure,router } from "../../trpc";
import { generatePath } from "../../utils/path-generator";
import { createFeildInputModel,createFeildOutputModel,getFeildInputModel,getFeildsOutputModel } from "./model";





const getPath = generatePath("/form");
const TAGS=["form"]


export const FormFeildProcedure=router({
    createFormFeild:protectedProcedure.meta({
        openapi: {
        method: "POST",
        path: getPath("/createFeild"),
        tags: TAGS,
      },
    }).input(createFeildInputModel).output(createFeildOutputModel).mutation(async ({input})=>{
      const {label,description,type,formId,isRequired,placeholder}= input

      const result =await FeildService.createFeild({label,description,type,formId,isRequired,placeholder})
      return result;
      

    }),

    getFormFeild:protectedProcedure.meta({
        openapi: {
        method: "GET",
        path: getPath("/getFeild"),
        tags: TAGS,
      },
    }).input(getFeildInputModel).output(getFeildsOutputModel).mutation(async ({input})=>{
      const {formId}=input
      

      const result =await FeildService.getFeild({formId})
      return result;
      

    })

})

