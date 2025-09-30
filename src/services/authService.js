
import User from "../entity/User.js";
import { v4 as uuidv4 } from 'uuid';
import userRepo from "../repositories/userRepo.js";

const STORAGE_TYPE = process.env.STORAGE_TYPE || "file"; // "file" or "mysql"

export const signUpService = async ( first_name,last_name, email, password,role,language,status) => {
    try{

        const id = uuidv4();
        
        const created_at = new Date()
        const newUser = new User(id, first_name, last_name,email, password, role,language,status,created_at);
        const registeredUser = await userRepo.createUser(newUser);
        return registeredUser;
    }
    catch(err){
        throw new Error("error on createUserService " + err)
    }
};