import db, { eq } from "@repo/database";
import { deleteFormSchema, DeleteFormPayload } from "./model";
import { formsTable } from "@repo/database/schema";
import formFeildService from "../form-feild";

export default class delteFormService {
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
      throw new Error("You are not authorized to delete this form");
    }
  }

  public async delete(payload: DeleteFormPayload, userId: string) {
    const { id } = await deleteFormSchema.parseAsync(payload);
    this.verifiedOwner(id, userId);
    const result = await db
      .delete(formsTable)
      .where(eq(formsTable.id, id))
      .returning({ id: formsTable.id });
      if(!result || result.length===0){
        throw new Error("There is no form exist with this id")
      }
      return result[0]
  }
 
}
