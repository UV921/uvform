import { pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { formsTable } from "./form";




export const submissionTable=pgTable("submissions",{
    id:uuid("id").primaryKey().defaultRandom(),
    formId:uuid("form_id").notNull().references(()=>formsTable.id,{
        onDelete:"cascade"
    }),
      
    createdAt:timestamp("created_at").defaultNow(),
    submittedAt:timestamp("updated_at").$defaultFn(()=>new Date()),

})