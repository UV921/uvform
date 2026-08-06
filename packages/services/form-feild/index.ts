//iss ka kaam hai feild create krna + aur feild ko get krna 
import { formsFeildsTable,} from "@repo/database/schema";
import { db, eq, max } from "@repo/database";
import { createFeildInput,createFeildInputType,getFeildInput,getFeildInputType } from "./model"; 

function toLabelKey(label: string): string {
    return label
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "_")
        .replace(/^_|_$/g, "");
}//label key is we giving becuase maybe tommorw we change the name of the label but we keep the 
//id to uniquely identify it 
//we create db record for form feild there is so many form feild for one formid so 



export  default class formFeildService{
    private async getNextIndex(formId:string):Promise<string>{
        const result =await db.select({maxIndex:max(formsFeildsTable.index)}).from(formsFeildsTable).where(eq(formsFeildsTable.formId,formId))
        const currentMaxIndex=result[0]?.maxIndex;
        const next=currentMaxIndex? Number(currentMaxIndex)+1:1
        return next.toString()


    }
    public async  createFeild(paylaod:createFeildInputType){

        const {label,formId,description: desription,type,placeholder,isRequired}= await createFeildInput.parseAsync(paylaod)
        const index=await this.getNextIndex(formId)
        const labelKey=toLabelKey(label)
        const result =await db.insert(formsFeildsTable).values({
            label,
            formId,
            desription,
            type,
            placeholder,
            isRequired,
            labelKey,
            index,

        }).returning({id:formsFeildsTable.id})

        if(!result || result.length===0 || !result[0]?.id){
            throw new Error("Failed to create form field")
        }
        return {id:result[0]!.id,labelKey,index}
        



    }
    public async getFeild(payload:getFeildInputType){
        const {formId}=await getFeildInput.parseAsync(payload)
        const result =await db.select().from(formsFeildsTable).where(eq(formsFeildsTable.formId,formId)).orderBy(formsFeildsTable.index)
        if(!result || result.length===0){
            throw new Error("Went something wrong during geeting feilds ")
        }
        if(result[0]){
            throw new Error("NO form esxit with this formId")
        }

        return result.map((r)=>({
            id:r.id,
            formId: r.formId,
            label: r.label,
            labelKey: r.labelKey,
            description: r.description ?? null,
            placeholder: r.placeholder ?? null,
            isRequired: r.isRequired,
            index: r.index.toString(),
            type: r.type,
            createdAt: r.createdAt ? r.createdAt.toISOString() : null,
            updatedAt: r.updatedAt ? r.updatedAt.toISOString() : null,

        }))
        

    

    }





}
