

import { pgTable, timestamp, time, uuid, varchar, text } from "drizzle-orm/pg-core";

export const userTable=pgTable("users",{
  id:uuid("id").primaryKey().defaultRandom( ),
 fullName:varchar("full_name",{length:100}).notNull(),
 email:varchar("email",{length:255}).notNull().unique(),
 hashedPassword:text("passowrd_hash"),
  createdAt:timestamp("created_at").defaultNow(),
  updatedAt:timestamp("updated_at").$defaultFn(()=>new Date()),
  

  
})