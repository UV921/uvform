import { protectedProcedure,router } from "../../trpc";
import { UpdateFeildService } from "../../services";
import { updateFeildInputModel,updateFeildOutputModel } from "./model";
import { generatePath } from "../../utils/path-generator";
const getPath = generatePath("/form");
const TAGS = ["form"];


export const updateFeildRouter=router({
    updateFeild:protectedProcedure.meta({
        openapi: {
        method: "PATCH",
        path: getPath("/getFeild"),
        tags: TAGS,
      },
    }).input(updateFeildInputModel).output(updateFeildOutputModel).mutation(async ({input,ctx})=>{
        const {id,label,description,type,isRequired,placeholder}=input;
        const userId=ctx.user.id;
        const result=await UpdateFeildService.updateFeild({id,label,description,type,isRequired,placeholder},userId)
        return result;


    })
})