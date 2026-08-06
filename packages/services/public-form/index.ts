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
            form: {
              id: form?.id,
              title: form?.title,
              description: form?.description ?? null,
            },
      
            fields: fields.map((field) => ({
              id: field.id,
              label: field.label,
              description: field.description ?? null,
              placeholder: field.placeholder ?? null,
              type: field.type,
              isRequired: field.isRequired,
              index: field.index,
            })),
          };
    }
}