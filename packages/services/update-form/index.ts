import db, { eq } from "@repo/database";
import { editformSchema, EditFormType } from "./model";
import { formsTable } from "@repo/database/schema";
import formFeildService from "../form-feild";


export default class updateFormService{
    private async verifiedOwner(id: string, userId: string) {
        const result = await db
          .select({
            id: formsTable.id,
            createdby: formsTable.createdby,
          })
          .from(formsTable)
          .where(eq(formsTable.id, id));
      
        const form = result[0];
      
        if (!form) {
          throw new Error("No form exists with this id");
        }
      
        if (form.createdby !== userId) {
          throw new Error("You are not authorized to update this form");
        }
      }


    
    public async updateForm(payload:EditFormType,userId:string){
        const {id,description,title}=editformSchema.parse(payload)
          this.verifiedOwner(id,userId)

        const updatedForm=await db.update(formsTable).set({
            description,
            title
    
        }).where(eq(formsTable.id,id)).returning()
        if(!updatedForm || updatedForm.length===0){
            throw new Error("NO form exist with this id")
        }
        
        return updatedForm[0]
        
    }
}
