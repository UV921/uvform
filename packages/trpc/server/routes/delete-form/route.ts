import { DeleteFormService } from "../../services";
import { router,protectedProcedure } from "../../trpc";
import { generatePath } from "../../utils/path-generator";

import { deleteFormInputModel, deleteFormOutputModel } from "./model";

const getPath = generatePath("/form");
const TAGS = ["form"];

export const deleteFormRouter=router({
    delete:protectedProcedure.meta({ openapi: {
        method: "PATCH",
        path: getPath("/deleteForm"),
        tags: TAGS,
      },}).input(deleteFormInputModel).output(deleteFormOutputModel).mutation(async ({ctx,input})=>{
        const {id}=input
        const result=await DeleteFormService.delete({id},ctx.user.id)
        return result

    })
})

