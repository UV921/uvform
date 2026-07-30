import { formsFeildsTable,formsTable } from "@repo/database/schema";
import { db, eq } from "@repo/database";
import { updateFeildInput,UpdateFeildInput } from "./model";


export default class updateFeildService {
    private async isVerifiedFeildUser(id:string,userId:string){
        const result =await db.select().from(formsFeildsTable).where(eq(formsFeildsTable.id,id))
        if(!result || result.length===0){
            throw new Error("not found")
        }
        if(result[0]!.formId===null ){
            throw new Error("this feild is not associated with any form")
        }
        const formID=result[0]!.formId
        const formResult=await db.select().from(formsTable).where(eq(formsTable.id,formID))
        if(!formResult || formResult.length===0){
            throw new Error("form with thsi id does not exist")
        }
        const UserId=formResult[0]!.createdby
        if(UserId!==userId){
            throw new Error("you cant edit this feild")}
            
         
    }
        public async updateFeild(payload:UpdateFeildInput,userId:string){
            
        const {id,label,type,description,isRequired,placeholder}= await updateFeildInput.parseAsync(payload)
        
        await this.isVerifiedFeildUser(id,userId)
        const result =await db.update(formsFeildsTable).set({
            label,
            type,
            description,
            isRequired,
            placeholder

        }).where(eq(formsFeildsTable.id,id)).returning()
        if(!result || result.length===0){
            throw new Error("feild not found with this credentials")
        }
        const updatedField = result[0]

if (!updatedField) {
  throw new Error("field not found")
}

return {
  ...updatedField,
  createdAt: updatedField.createdAt?.toISOString() ?? null,
  updatedAt: updatedField.updatedAt?.toISOString() ?? null,
};

    }
}