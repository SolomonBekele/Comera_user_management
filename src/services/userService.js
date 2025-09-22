import { v4 as uuidv4 } from 'uuid';
import { readUsersFile,writeUsersFile } from "../config/userConfig/userFileHanler.js";
import User from "../model/usersModel.js";
import { changeLibrarianStatusRepo, changePasswordRepo, deleteUserRepo, getAllUsersRepo, getUserByEmailRepo, getUserByIdRepo, getUsersByRoleRepo, updateUserRepo } from '../Repositories/userRepository.js';

export const getAllUsersService = async () => {
  try {
        return await getAllUsersRepo();
      } catch (err) {
          throw new Error("error on getAllUserService: " + err.message)
      }
};
export const getUserByIdService = async (id) => {
  try {
        return await getUserByIdRepo(id);    
      } catch (err) {
          throw new Error("error on getUserByIdService " + err.message)
      }
};
export const getUserByEmailService = async (email) => {
  try {
        const user = await getUserByEmailRepo(email);
        return user;
      } catch (err) {
          throw new Error("error on getUserByEmailService " + err.message)
      }
  
};
export const updateUserService = async (id,first_name,last_name,) => {
  try{
        return await updateUserRepo(id,first_name,last_name)
    }
    catch(err){
        throw new Error("error on update UserService " + err)
    }
};
export const deleteUserService = async (id) => {
  try {
    const deleted = await deleteUserRepo(id);
    return deleted;
  } catch (err) {
    throw new Error("Error in deleteUserService: " + err.message);
  }
};
export const changePasswordService = async (id,password) => {
  try {
    const updated = await changePasswordRepo(id, password);
    return updated;
  } catch (err) {
    throw new Error("Error in changePasswordService: " + err.message);
  }
};
export const changeLibrarianStatusService = async (id,status) => {
  try {
    const updated = await changeLibrarianStatusRepo(id, status);
    return updated;
  } catch (err) {
    throw new Error("Error in changeLibrarianStatusService: " + err.message);
  }
};
export const getUsersByRoleService = async (role) => {
  try {
    return await getUsersByRoleRepo(role);
  } catch (err) {
    throw new Error("Error in getUsersByRoleService: " + err.message);
  }
};