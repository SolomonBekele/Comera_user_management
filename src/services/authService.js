import { readUsersFile, writeUsersFile } from "../config/userFileHanler.js";
import User from "../model/usersModel.js";
import { v4 as uuidv4 } from 'uuid';

export const signUpService = async ( first_name,last_name, email, password) => {
    try{
        const usersData = await readUsersFile()
        const parsedUsers = JSON.parse(usersData)

        const id = uuidv4();
        const role = "user";
        const created_at = new Date()
        const newUser = new User(id, first_name, last_name,email, password, role,created_at);
        parsedUsers.push({...newUser});
        const newUsers = JSON.stringify(parsedUsers, null, 2);
        await writeUsersFile(newUsers)
        return newUser;
    }
    catch(err){
        throw new Error("error on createUserService " + err)
    }
};