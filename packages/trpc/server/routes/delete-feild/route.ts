import { protectedProcedure,router

 } from "../../trpc";
import { deleteFeildInputModel, deleteFeildOutputModel } from "./model";
import { DeleteFeildService } from "../../services";

 export const deleteFeildRouter=router({
    deleteFeild:protectedProcedure.input(deleteFeildInputModel).output(deleteFeildOutputModel).mutation(async ({input,ctx})=>{
        const {id}=input
        const result=await DeleteFeildService.deleteFeild({id},ctx.user.id)
      
        return result
 })})