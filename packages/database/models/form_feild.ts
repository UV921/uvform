
import { pgTable,uuid,timestamp, varchar, pgEnum, text, boolean, numeric } from "drizzle-orm/pg-core";
import { userTable } from "./user";
import { formsTable } from "./form";

export const feildTypeEnum=pgEnum("feild_type_enum",[
    "EMAIL",
    "TEXT",
    "NUMBER",
    "YES_NO",
    "PASSWORD"
])


export const formsFeildsTable=pgTable("forms_feild",{
    id:uuid("id").primaryKey().defaultRandom(),
    formId:uuid("form_id").references(()=>formsTable.id),
    label:varchar("label",{length:100}).notNull(),
    labelKey:varchar("label_key",{length:100}).notNull(),
    description:text("description"),
    placeholder:text("placeholder"),
    isRequired:boolean("is_required").default(false).notNull(),
    index:numeric("index").notNull(),
    type:feildTypeEnum("type").notNull(),



    
    createdAt:timestamp("created_at").defaultNow(),
    updatedAt:timestamp("updated_at").$defaultFn(()=>new Date()),

});