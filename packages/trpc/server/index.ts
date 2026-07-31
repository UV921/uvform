import { router } from "./trpc";

import { healthRouter } from "./routes/health/route";
import { authRouter } from "./routes/auth/route";
import { formRouter } from "./routes/form/route";
import {FormFeildRoute  } from "./routes/form-feild/route";
import { updateFeildRouter } from "./routes/update-feild/route";
import { deleteFeildRouter } from "./routes/delete-feild/route";
import { updateFormRouter } from "./routes/update-form/route";


export const serverRouter = router({
  health: healthRouter,
  auth:authRouter,
  form:formRouter,
  editForm:updateFormRouter,
  formFeild:FormFeildRoute,
  updateFeild:updateFeildRouter,
  delete:deleteFeildRouter

});

export { createContext } from "./context";
export type ServerRouter = typeof serverRouter;
