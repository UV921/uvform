import { router } from "./trpc";

import { healthRouter } from "./routes/health/route";
import { authRouter } from "./routes/auth/route";
import { formRouter } from "./routes/form/route";
import {FormFeildRoute  } from "./routes/form-feild/route";
import { updateFeildRouter } from "./routes/update-feild/route";


export const serverRouter = router({
  health: healthRouter,
  auth:authRouter,
  form:formRouter,
  formFeild:FormFeildRoute,
  updateFeild:updateFeildRouter

});

export { createContext } from "./context";
export type ServerRouter = typeof serverRouter;
