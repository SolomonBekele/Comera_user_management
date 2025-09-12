import argon2 from "argon2";
import { changeLibrarianStatusService, changePasswordService, deleteUserService, getAllUsersService, getUserByIdService, getUsersByRoleService, updateUserService } from "../services/userService.js";
import i18n from "../i18n/langConfig.js";


export const getAllUsers = async (req,res,next) =>{
    try{
        const users = await getAllUsersService();
        if(!users){
            return res.status(404).json({
            message:i18n.__("USER.RETRIEVED_NONE")  
            })
        }
        const usersWithoutPasswords = users.map(({ password, ...rest }) => rest);
        res.status(200).json({
            success:true,
            message:i18n.__("USER.RETRIEVED_ALL",{count:usersWithoutPasswords.length}),
            data:usersWithoutPasswords
        })
    }catch(err){
        console.log("Registration error occured", err);
        res.status(500).json({
        success: false,
        message: "Internal server error",
    });
    }
}
export const getUserById = async (req,res,next) =>{
    try{
        const id = req.params.id;
        const user = await getUserByIdService(id);
        if(!user){
            return res.status(404).json({
                success:true,
                message:i18n.__("USER.NOT_FOUND_ID",{id:id})
            })
        }
        const {password,...userWithoutPassword} = user
        res.status(200).json({
            success:true,
            message:i18n.__("USER.RETRIEVED_BY_ID",{id,id}),
            data:userWithoutPassword
        })
    }catch(err){
        console.log("fetch user data error occured", err);
        res.status(500).json({
        success: false,
        message: "Internal server error",
    });
    }
}
export const getUserByToken = async (req,res,next) =>{
    try{
        const id = req.user.id;
        const user = await getUserByIdService(id);
        if(!user){
            return res.status(404).json({
                success:true,
                message:i18n.__("USER.NOT_FOUND_ID",{id:id})
            })
        }
        const {password,...userWithoutPassword} = user
        res.status(200).json({
            success:true,
            message:i18n.__("USER.RETRIEVED_BY_ID",{id,id}),
            data:userWithoutPassword
        })
    }catch(err){
        console.log("fetch user data error occured", err);
        res.status(500).json({
        success: false,
        message: "Internal server error",
    });
    }
}
export const updateUserById = async (req,res,next) =>{
    try{
        const id = req.params.id;
        const {first_name,last_name} = req.body;
        const user = await updateUserService(id,first_name,last_name);
        if(user === -1){
            return res.status(404).json({
                success:true,
                message:i18n.__("USER.NOT_FOUND_ID",{id:id})
            })
        }
        const {password,...userWithoutPassword} = user
        res.status(200).json({
            success:true,
            message:i18n.__("USER.UPDATED",{id:id}),
            data:userWithoutPassword
        })
    }catch(err){
        console.log("fetch user data error occured", err);
        res.status(500).json({
        success: false,
        message: "Internal server error",
    });
    }
}
export const deleteUserById = async (req,res,next) =>{
    try{
        const id = req.params.id;
        const user = await deleteUserService(id);
        if(user === -1){
            return res.status(404).json({
                success:true,
                message:i18n.__("USER.NOT_FOUND_ID",{id:id})
            })
        }
        res.status(200).json({
            success:true,
            message:i18n.__("USER.DELETED",{id:id}),
        })
    }catch(err){
        console.log("fetch user data error occured", err);
        res.status(500).json({
        success: false,
        message: "Internal server error",
    });
    }
}
export const changePassword = async (req,res,next) =>{
    try{
        const id = req.params.id;
        const {oldPassword,newPassword} = req.body;
        const user = await getUserByIdService(id);
        if(!user){
            return res.status(404).json({
                success:true,
                message:i18n.__("USER.NOT_FOUND_ID",{id:id})
            })
        }
        const isCorrectOldPassword = await argon2.verify(user.password,oldPassword)
        if(!isCorrectOldPassword){
            return res.status(404).json({
                success:true,
                message:i18n.__('USER.OLD_PASSWORD_INCORRECT',{id:id})
            })
        }
        const hashedPassword = await argon2.hash(newPassword)
        const changed = await changePasswordService(id,hashedPassword);
        res.status(200).json({
            success:true,
            message:i18n.__('USER.PASSWORD_CHANGED')
        })
    }catch(err){
        console.log("fetch user data error occured", err);
        res.status(500).json({
        success: false,
        message: "Internal server error",
    });
    }
}

export const changeLibrarianStatus = async (req, res) => {
  try {
    const { id } = req.params;   
    const { status } = req.body;

    const result = await changeLibrarianStatusService(id, status);

    if (result) {
      return res.status(200).json({
        message: `Librarian status updated successfully to "${status}".`,
      });
    } else {
      return res.status(404).json({
        message: "Librarian not found.",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Error updating librarian status.",
      error: err.message,
    });
  }
};

export const getUserByRole = async (req, res) => {
  try {
    const { role } = req.params; 

    const users = await getUsersByRoleService(role);

    if (users.length === 0) {
      return res.status(404).json({ message: `No users found with role: ${role}` });
    }
    const usersWithoutPasswords = users.map(({ password, ...rest }) => rest);
    return res.status(200).json({
      success:true,
      message: `Users with role: ${role}`,
      data: usersWithoutPasswords,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error fetching users by role.",
      error: err.message,
    });
  }
};



