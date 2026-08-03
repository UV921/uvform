import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { formsTable } from "./form";
import { submissionTable } from "./form_submission";
import { formsFeildsTable } from "./form_feild";




export const submissionAnswerTable=pgTable("submission_answers",{
    id:uuid("id").primaryKey().defaultRandom(),
    submissionId:uuid("sumbission_id").notNull().references(()=>submissionTable.id,{
        onDelete:"cascade"
    }),
    fieldId:uuid("field_id").notNull().references(()=>formsFeildsTable.id,{
        onDelete:"cascade"

    }),
    fieldValue:text("field_value").notNull(),
    
      
    createdAt:timestamp("created_at").defaultNow(),
   

})