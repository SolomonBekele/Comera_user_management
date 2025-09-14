import { v4 as uuidv4 } from 'uuid';
import { readUsersFile,writeUsersFile } from "../config/userConfig/userFileHanler.js";
import User from "../model/usersModel.js";

export const getAllUsersService = async () => {
  try {
        const usersData = await readUsersFile()
        return JSON.parse(usersData)
      } catch (err) {
          throw new Error("error on getAllUserService: " + err.message)
      }
};
export const getUserByIdService = async (id) => {
  try {
        const usersData = await readUsersFile()
        const parsedUsers = JSON.parse(usersData)
        const fetchedUser = parsedUsers.find(user=>user.id == id)   
        return fetchedUser;    
      } catch (err) {
          throw new Error("error on getUserByIdService " + err.message)
      }
};
export const getUserByEmailService = async (email) => {
  try {
        const usersData = await readUsersFile();
        const parsedUsers = JSON.parse(usersData)
        const fetchedUser = parsedUsers.find(user=>user.email == email)   
        return fetchedUser;    
      } catch (err) {
          throw new Error("error on getUserByEmailService " + err.message)
      }
  
};``
export const updateUserService = async (id,first_name,last_name,) => {
  try{
        const usersData = await readUsersFile()
        const parsedUsers = JSON.parse(usersData)
        const fetchedIndex = parsedUsers.findIndex(user=>user.id == id)
        if(fetchedIndex !== -1){
        parsedUsers[fetchedIndex]['first_name'] = first_name;
        parsedUsers[fetchedIndex]['last_name'] = last_name;
        const newUsers = JSON.stringify(parsedUsers, null, 2);
        await writeUsersFile(newUsers)
        return parsedUsers[fetchedIndex]
        }
        
        return fetchedIndex;
    }
    catch(err){
        throw new Error("error on update UserService " + err)
    }
};
export const deleteUserService = async (id) => {
  try{
        const usersData = await readUsersFile()
        const parsedUsers = JSON.parse(usersData)
        const fetchedIndex = parsedUsers.findIndex(user=>user.id == id)
        if(fetchedIndex !== -1){
            parsedUsers.splice(fetchedIndex,1)
            const newUsers = JSON.stringify(parsedUsers, null, 2);
            await writeUsersFile(newUsers)
        }
        return fetchedIndex;
    }
    catch(err){
        throw new Error("error on delete UserService " + err)
    }
};
export const changePasswordService = async (id,password) => {
  try{
        const usersData = await readUsersFile()
        const parsedUsers = JSON.parse(usersData)
        const fetchedIndex = parsedUsers.findIndex(user=>user.id == id) 
        parsedUsers[fetchedIndex]['password'] = password;
        const newUsers = JSON.stringify(parsedUsers, null, 2);
        await writeUsersFile(newUsers)
        return true;
    }
    catch(err){
        throw new Error("error on change password Service " + err)
    }
};
export const changeLibrarianStatusService = async (id,status) => {
  try{
        const usersData = await readUsersFile()
        const parsedUsers = JSON.parse(usersData)
        const fetchedIndex = parsedUsers.findIndex(user=>user.id == id) 
        parsedUsers[fetchedIndex]['status'] = status.toUpperCase();
        const newUsers = JSON.stringify(parsedUsers, null, 2);
        await writeUsersFile(newUsers)
        return true;
    }
    catch(err){
        throw new Error("error on change librarian status UserService " + err)
    }
};
export const getUsersByRoleService = async (role) => {
  try {
    const usersData = await readUsersFile();
    const parsedUsers = JSON.parse(usersData);

    // Filter users by role
    const filteredUsers = parsedUsers.filter(user => user.role === role);

    return filteredUsers;
  } catch (err) {
    throw new Error("Error in getUserByRoleService: " + err.message);
  }
};