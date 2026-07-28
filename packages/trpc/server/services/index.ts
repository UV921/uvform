import userService from "@repo/services/user"
import formService from "@repo/services/form"
import updateFeildService from "@repo/services/update-feild"
import formFeildService from "@repo/services/form-feild"

export const UserService=new userService();
export const FormService=new formService();
export const FeildService=new formFeildService()
export const UpdateFeildService=new updateFeildService()