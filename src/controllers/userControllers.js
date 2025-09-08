import argon2 from "argon2";
import { changePasswordService, deleteUserService, getAllUsersService, getUserByEmailService, getUserByIdService, updateUserService } from "../services/userService.js";



export const getAllUsers = async (req,res,next) =>{
    try{
        const users = await getAllUsersService();
        if(!users){
            return res.status(404).json({
                message:"user not found"
            })
        }
        const usersWithoutPasswords = users.map(({ password, ...rest }) => rest);
        res.status(200).json({
            success:true,
            message:"users fetched successfully",
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
                message:`user not found with id ${id}`
            })
        }
        console.log(password1);
        const {password,...userWithoutPassword} = user
        res.status(200).json({
            success:true,
            message:"user fetched successfully",
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
                message:`user not found with id ${id}`
            })
        }
        const {password,...userWithoutPassword} = user
        res.status(200).json({
            success:true,
            message:"user updated successfully",
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
                message:`user not found with id ${id}`
            })
        }
        res.status(200).json({
            success:true,
            message:"user deleted successfully",
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
                message:`user not found with id ${id}`
            })
        }
        const isCorrectOldPassword = await argon2.verify(user.password,oldPassword)
        if(!isCorrectOldPassword){
            return res.status(404).json({
                success:true,
                message:`your old message is not correct with id ${id}`
            })
        }
        const hashedPassword = await argon2.hash(newPassword)
        const changed = await changePasswordService(id,hashedPassword);
        res.status(200).json({
            success:true,
            message:"password changed successfully",
        })
    }catch(err){
        console.log("fetch user data error occured", err);
        res.status(500).json({
        success: false,
        message: "Internal server error",
    });
    }
}


