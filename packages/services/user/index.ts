import { db, eq } from "@repo/database";
import { userTable } from "@repo/database/models/user";
import {
  createUserWithEmailAndPassword,
  type CreateUserWithEmailAndPassword,
  generateUserTokenPaylod,
  
  type GenerateUserTokenPaylod,
  type SignInUserWithEmailandPass,
  signInUserWithEmailandPass,
} from "./model";
import bcrypt from "bcryptjs";
import * as JWT from "jsonwebtoken";
import { env } from "../env";

export default class userService {
  private async getUserByEmail(email: string) {
    const result = await db.select().from(userTable).where(eq(userTable.email, email));
    if (!result || result.length === 0) return null;

    return result[0];
  }
  private async generateToken(payload: GenerateUserTokenPaylod) {
    const { id } = await generateUserTokenPaylod.parseAsync(payload);
    const token = JWT.sign({ id }, env.JWT_SECRET);
    return { token };
  }
  public async createUserWithEmailAndPassword(payload: CreateUserWithEmailAndPassword) {
    const { fullName, email, password } = await createUserWithEmailAndPassword.parseAsync(payload);
    const user = await this.getUserByEmail(email);
    if (user) throw new Error("User with this email already exist ");
    const passwordHash = await bcrypt.hash(password, 10);
    const result = await db
      .insert(userTable)
      .values({ fullName, email, hashedPassword: passwordHash })
      .returning({ id: userTable.id });

    if (!result || result.length === 0 || !result[0]?.id) {
      throw new Error("something went wrong while creating user");
    }

    const { token } = await this.generateToken({ id: result[0].id });

    return {
      id: result[0].id,
      token,
    };
  }

  public async signInUserWithEmailandPass(payload: SignInUserWithEmailandPass) {
    //user subit their email and pass
    //validate the paylaod
    //then check does user exit with this ?? in db if yes
    //then passworc capmapre kro if mathc create a toekn and reurn it

    const { email, password } = await signInUserWithEmailandPass.parseAsync(payload);
    const existingUser = await this.getUserByEmail(email);
    if (!existingUser) {
      throw new Error("User with this email not exist");
    }
    if (!existingUser.hashedPassword) {
      throw new Error("invalid method of authentication");
    }
    const comaprepass = bcrypt.compare(password, existingUser.hashedPassword);
    if (!comaprepass) {
      throw new Error("invalid email or password");
    }

    const { token } = await this.generateToken({ id: existingUser.id });

    return {
      id: existingUser.id,
      token,
    };
  }
  public async getUserById(id: string) {
    const user = await db
      .select({ id: userTable.id, fullName: userTable.fullName, email: userTable.email })
      .from(userTable)
      .where(eq(userTable.id, id));
      if(!user || user.length===0){
        throw new Error("user not found")
      }
      return user[0]!;
  }
  public async verifyAndDecodeToken(token: string) {
    try{
     const decoded=JWT.verify(token,env.JWT_SECRET)
     return decoded as GenerateUserTokenPaylod
     
      
    }catch(err){
      throw new Error("invalid token")
    }}
}
