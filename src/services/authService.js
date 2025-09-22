import { readUsersFile, writeUsersFile } from "../config/userConfig/userFileHanler.js";
import User from "../model/usersModel.js";
import { v4 as uuidv4 } from 'uuid';
import { createUser } from "../Repositories/userRepository.js";

const STORAGE_TYPE = process.env.STORAGE_TYPE || "file"; // "file" or "mysql"

export const signUpService = async ( first_name,last_name, email, password,role,language,status) => {
    try{

        const id = uuidv4();
        
        const created_at = new Date()
        const newUser = new User(id, first_name, last_name,email, password, role,language,status,created_at);
        
        return await createUser(newUser);
    }
    catch(err){
        throw new Error("error on createUserService " + err)
    }
};