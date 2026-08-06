import { db, eq } from "@repo/database";
import { formsTable } from "@repo/database/models/form";
import { createFormInput, CreateFormInputType ,getFormByIdInput,GetFormByIdInputType, listFormByIdInput, ListFormByIdInputType} from "./model";
import bcrypt from "bcryptjs";
import * as JWT from "jsonwebtoken";
import { env } from "../env";
import { id } from "zod/v4/locales";

export default class formService {
  public async createForm(payload: CreateFormInputType) {
    const { title, description, createdby } = await createFormInput.parseAsync(payload);
    const result = await db
      .insert(formsTable)
      .values({
        title,
        description,
        createdby,
      })
      .returning({ id: formsTable.id });
    if (!result || result.length === 0) {
      throw new Error("something went wrong while creating form");
    }
    return{
        id:result[0]!.id
    }
  }
  public async listFormById(payload: ListFormByIdInputType) {
    const { userID } = await listFormByIdInput.parseAsync(payload);
    const result = await db.select({
        id: formsTable.id,
                title: formsTable.title,
                description: formsTable.description,
                createdAt: formsTable.createdAt,
                updatedAt: formsTable.updatedAt,
    })
                .from(formsTable).where(eq(formsTable.createdby,userID ));
    if (!result || result.length === 0) {
      throw new Error("Form not found");
    }
    return result;
  }

  public async getFormById(payload:GetFormByIdInputType){
    const {formId}=await getFormByIdInput.parseAsync(payload)
    const result=await db.select().from(formsTable).where(eq(formsTable.id,formId))
    if(!result || result.length === 0){
      throw new Error("Form not found");
    }
    return result;
  }
}
