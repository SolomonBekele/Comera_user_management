import argon2 from "argon2";
import {  
  changeLibrarianStatusService, 
  changePasswordService, 
  deleteUserService, 
  getAllUsersService, 
  getUserByIdService, 
  getUsersByRoleService, 
  updateUserService 
} from "../services/userService.js";
import i18n from "../i18n/langConfig.js";
import logger from "../utils/logger.js";

// ==================== GET ALL USERS ====================
export const getAllUsers = async (req,res,next) =>{
    try{
        const users = await getAllUsersService();
        if(!users){
            logger.warn("No users found in database");
            return res.status(404).json({
                message:i18n.__("USER.RETRIEVED_NONE")  
            })
        }
        const usersWithoutPasswords = users.map(({ password, ...rest }) => rest);
        logger.info(`Fetched all users: count=${usersWithoutPasswords.length}`);
        res.status(200).json({
            success:true,
            message:i18n.__("USER.RETRIEVED_ALL",{count:usersWithoutPasswords.length}),
            data:usersWithoutPasswords
        })
    }catch(err){
        logger.error("Error fetching all users", { message: err.message, stack: err.stack });
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}

// ==================== GET USER BY ID ====================
export const getUserById = async (req,res,next) =>{
    try{
        const id = req.params.id;
        const user = await getUserByIdService(id);
        if(!user){
            logger.warn(`User not found: id=${id}`);
            return res.status(404).json({
                success:true,
                message:i18n.__("USER.NOT_FOUND_ID",{id:id})
            })
        }
        const {password,...userWithoutPassword} = user;
        logger.info(`Fetched user by id: id=${id}`);
        res.status(200).json({
            success:true,
            message:i18n.__("USER.RETRIEVED_BY_ID",{id,id}),
            data:userWithoutPassword
        })
    }catch(err){
        logger.error(`Error fetching user by id=${req.params.id}`, { message: err.message, stack: err.stack });
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}

// ==================== GET USER BY TOKEN ====================
export const getUserByToken = async (req,res,next) =>{
    try{
        const id = req.user.id;
        const user = await getUserByIdService(id);
        if(!user){
            logger.warn(`User not found by token: id=${id}`);
            return res.status(404).json({
                success:true,
                message:i18n.__("USER.NOT_FOUND_ID",{id:id})
            })
        }
        const {password,...userWithoutPassword} = user;
        logger.info(`Fetched user by token: id=${id}`);
        res.status(200).json({
            success:true,
            message:i18n.__("USER.RETRIEVED_BY_ID",{id,id}),
            data:userWithoutPassword
        })
    }catch(err){
        logger.error(`Error fetching user by token id=${req.user.id}`, { message: err.message, stack: err.stack });
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}

// ==================== UPDATE USER ====================
export const updateUserById = async (req,res,next) =>{
    try{
        const id = req.params.id;
        const {first_name,last_name} = req.body;
        const user = await updateUserService(id,first_name,last_name);
        if(!user){
            logger.warn(`User not found for update: id=${id}`);
            return res.status(404).json({
                success:true,
                message:i18n.__("USER.NOT_FOUND_ID",{id:id})
            })
        }
        const {password,...userWithoutPassword} = user;
        logger.info(`User updated: id=${id}`);
        res.status(200).json({
            success:true,
            message:i18n.__("USER.UPDATED",{id:id}),
            data:userWithoutPassword
        })
    }catch(err){
        logger.error(`Error updating user id=${req.params.id}`, { message: err.message, stack: err.stack });
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}

// ==================== DELETE USER ====================
export const deleteUserById = async (req,res,next) =>{
    try{
        const id = req.params.id;
        const user = await deleteUserService(id);
        if(!user){
            logger.warn(`User not found for deletion: id=${id}`);
            return res.status(404).json({
                success:true,
                message:i18n.__("USER.NOT_FOUND_ID",{id:id})
            })
        }
        logger.info(`User deleted: id=${id}`);
        res.status(200).json({
            success:true,
            message:i18n.__("USER.DELETED",{id:id}),
        })
    }catch(err){
        logger.error(`Error deleting user id=${req.params.id}`, { message: err.message, stack: err.stack });
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}

// ==================== CHANGE PASSWORD ====================
export const changePassword = async (req,res,next) =>{
    try{
        const id = req.params.id;
        const {oldPassword,newPassword} = req.body;
        const user = await getUserByIdService(id);
        if(!user){
            logger.warn(`User not found for password change: id=${id}`);
            return res.status(404).json({
                success:true,
                message:i18n.__("USER.NOT_FOUND_ID",{id:id})
            })
        }
        const isCorrectOldPassword = await argon2.verify(user.password,oldPassword)
        if(!isCorrectOldPassword){
            logger.warn(`Old password incorrect for user id=${id}`);
            return res.status(404).json({
                success:true,
                message:i18n.__('USER.OLD_PASSWORD_INCORRECT',{id:id})
            })
        }
        const hashedPassword = await argon2.hash(newPassword)
        await changePasswordService(id,hashedPassword);
        logger.info(`Password changed for user id=${id}`);
        res.status(200).json({
            success:true,
            message:i18n.__('USER.PASSWORD_CHANGED')
        })
    }catch(err){
        logger.error(`Error changing password for user id=${req.params.id}`, { message: err.message, stack: err.stack });
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}

// ==================== CHANGE LIBRARIAN STATUS ====================
export const changeLibrarianStatus = async (req, res) => {
  try {
    const { id } = req.params;   
    const { status } = req.body;

    const result = await changeLibrarianStatusService(id, status);

    if (result) {
      logger.info(`Librarian status updated: id=${id}, status=${status}`);
      return res.status(200).json({
        message: i18n.__("LIBRARIAN.STATUS_UPDATED",{status:status}),
      });
    } else {
      logger.warn(`Librarian not found for status update: id=${id}`);
      return res.status(404).json({
        message: i18n.__("LIBRARIAN.NOT_FOUND"),
      });
    }
  } catch (err) {
    logger.error(`Error updating librarian status id=${req.params.id}`, { message: err.message, stack: err.stack });
    return res.status(500).json({
      message: "Error updating librarian status.",
      error: err.message,
    });
  }
};

// ==================== GET USERS BY ROLE ====================
export const getUserByRole = async (req, res) => {
  try {
    const { role } = req.params; 
    const users = await getUsersByRoleService(role);

    if (users.length === 0) {
      logger.warn(`No users found with role=${role}`);
      return res.status(404).json({ message: i18n.__("USER.NO_USERS_WITH_ROLE",{role:role}) });
    }

    const usersWithoutPasswords = users.map(({ password, ...rest }) => rest);
    logger.info(`Fetched ${usersWithoutPasswords.length} users with role=${role}`);
    return res.status(200).json({
      success:true,
      message: i18n.__("USER.USERS_WITH_ROLE",{role:role}),
      data: usersWithoutPasswords,
    });
  } catch (err) {
    logger.error(`Error fetching users by role=${req.params.role}`, { message: err.message, stack: err.stack });
    return res.status(500).json({
      message: "Error fetching users by role.",
      error: err.message,
    });
  }
};
