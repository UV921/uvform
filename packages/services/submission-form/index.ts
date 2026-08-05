import db, { eq } from "@repo/database";
import { submissionSchema, SubmissionType } from "./model";
import { formsFeildsTable, formsTable, submissionAnswerTable, submissionTable, } from "@repo/database/schema";


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

    //verify feild
    const verifyFeild = answer.every((ans) => feilds.find((feild) => ans.feildId === feild.id));
    if (!verifyFeild) {
      throw new Error("This feild is not a part of the form");
    }

    //verify that the which feild is required ,thier value is filled or not

    const verifyRequiredFeild = feilds.every((field) => {
      if (!field.isRequired) return true;
      const ans = answer.find((ans) => field.id === ans.feildId);
      if (ans) {
        return ans.value.trim().length > 0 ? true : false;
      }
    });
    if (!verifyRequiredFeild) {
      throw new Error("You have not provided the value for required field");
    }
    const validAnswer = answer.filter((ans) => ans.value.trim().length > 0);

    const result=await db.transaction(async (tx)=>{
        const [submission]=await tx.insert(submissionTable).values({
            formId
        }).returning({
            id:submissionTable.id
        })
        if(!submission){
            throw new Error("There is some error while creating the sumbission table")
        }

        const answerRows=validAnswer.map((ans)=>({
            fieldId: ans.feildId,
            fieldValue: ans.value,
            submissionId: submission.id,

        }))
        await tx.insert(submissionAnswerTable).values(answerRows);
        return submission
       
    })


   return {
    success: true,
    submissionId: result.id,
};


  }
}
