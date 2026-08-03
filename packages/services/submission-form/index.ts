import db, { eq } from "@repo/database";
import { submissionSchema, SubmissionType } from "./model";
import { formsFeildsTable, formsTable } from "@repo/database/schema";

export default class submissionService {
  //we have to get the form
  //get all the feild from that form
  //validate that all feild is have here which send by the user
  //check that every feild required has non emepty answer
  //removed usnaswr otpional feild
  //create one raw in summbisom
  //get the new sumbission id
  //createmany rpwos using sumbsision id
  //return scuess and sumbsison id
  public async verifedSubmission(payload: SubmissionType) {
    const { formId, answer } = await submissionSchema.parseAsync(payload);
    const form = await db.select().from(formsTable).where(eq(formsTable.id, formId));
    if (!form || form.length === 0) {
      throw new Error("No form exist with this id ");
    }
    const userFormID = form[0]?.id;
    const feilds = await db
      .select()
      .from(formsFeildsTable)
      .where(eq(formsFeildsTable.formId, formId));

      
  }
}
