import { protectedProcedure, router } from "../../trpc";
import { updateFormInputModel, updateFormOutputMdoel } from "./model";
import { UpdateFormService } from "../../services";
import { generatePath } from "../../utils/path-generator";
const getPath = generatePath("/form");
const TAGS = ["form"];

export const updateFormRouter = router({
  updateForm: protectedProcedure
    .meta({
      openapi: {
        method: "POST",
        path: getPath("/updateForm"),
        tags: TAGS,
      },
    })
    .input(updateFormInputModel)
    .output(updateFormOutputMdoel)
    .mutation(async ({ctx,input})=>{
        const {id,description,title}=input
        const reuslt=await UpdateFormService.updateForm({id,description,title},ctx.user.id)
        if (!reuslt){
            throw new Error('')
        }
        return reuslt;

    }),
});
