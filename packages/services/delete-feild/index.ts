import db, { eq } from "@repo/database";
import { deleteFieldModel,DeleteFieldType } from "./model";
import { formsFeildsTable,formsTable } from "@repo/database/schema";
//id:feild-id
//check the feild where id=feild.id
//delte that 
//return 
export default class deleteFeildService{
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
    public async  deleteFeild(payload:DeleteFieldType,userId:string){
        const {id}=await deleteFieldModel.parseAsync(payload)
        await this.isVerifiedFeildUser(id,userId)
        const result=await db.delete(formsFeildsTable).where(eq(formsFeildsTable.id,id)).returning({id:formsFeildsTable.id})
       if(!result[0] || result.length===0 ){
        throw new Error("feild not found with this credentials")        }
        return result[0]

    }
}
