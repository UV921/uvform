import { protectedProcedure ,router} from "../../trpc";
import { generatePath } from "../../utils/path-generator";
import { createFormInput,createFormOutput, listFormByIdInput, listFormByIdOutput } from "./model";
import { FormService } from "../../services";


const getPath = generatePath("/form");
const TAGS=["form"]



export const formRouter=router({
    createForm:protectedProcedure.meta({openapi: {
        method: "POST",
        path: getPath("/createForm"),
        tags: TAGS,
      },}).input(createFormInput).output(createFormOutput).mutation(async ({input,ctx})=>{
        const {title,description}=input
        const {id}=await FormService.createForm({
            title,description,
            createdby:ctx.user.id
        })
        return {
            id
        }

      }),

      listFormById:protectedProcedure.meta({openapi: {
        method: "GET",
        path: getPath("/listForm"),
        tags: TAGS,},}).input(listFormByIdInput).output(listFormByIdOutput).query( async ({ctx})=>{
            const forms =await FormService.listFormById({userID:ctx.user.id})
            return forms;
        })
})
