import db, { eq } from "@repo/database";

import { getPublicFormByIdInput, GetPublicFormByIdInputType } from "./model";
import formFeildService from "../form-feild";
import formService from "../form";

const FormFeildService=new formFeildService()
const FormService=new formService()



export default class publicFormService {
    public async getPublicFormById(payload:GetPublicFormByIdInputType){
        const {formId}=await getPublicFormByIdInput.parseAsync(payload)
        const form=await FormService.getFormById({formId})
        const fields=await FormFeildService.getFeild({formId})
        return {
            form,
            fields
        }
    }
}