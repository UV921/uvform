import { SubmitFormService,GetFormFieldService} from "../../services";
import { publicProcedure ,router} from "../../trpc";
import { generatePath } from "../../utils/path-generator";
import { getFormFeildInputModel, getFormFeildOutputModel ,submitFormInputModel,submitFormOutputModel} from "./model";


const getPath = generatePath("/form");
const TAGS = ["form"];
export const  publicFormRouter=router({
    getPublicForm:publicProcedure.meta({
        openapi: {
            method: "GET",
            path: getPath("/getPublicForm"),
            tags: TAGS,
          },
    }).input(getFormFeildInputModel).output(getFormFeildOutputModel).query(async ({input})=>{
        const {formId}=input;
        const result =await GetFormFieldService.getPublicFormById({formId})
        return result


    }),



    submitForm:publicProcedure.meta({
        openapi: {
            method: "POST",
            path: getPath("/formSubmission"),
            tags: TAGS,
          },
    }).input(submitFormInputModel).output(submitFormOutputModel).mutation(async ({input})=>{
        const {formId,answer} =input
        const result=await SubmitFormService.verifedSubmission({formId,answer})
        return result
    })

})