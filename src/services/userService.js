import userRepo from "../repositories/userRepo.js";

// ---- GET ALL USERS ----
export const getAllUsersService = async () => {
  try {
    return await userRepo.getAllUsersRepo();
  } catch (err) {
    throw new Error("Error in getAllUsersService: " + err.message);
  }
};

// ---- GET USER BY ID ----
export const getUserByIdService = async (id) => {
  try {
    return await userRepo.getUserByIdRepo(id);
  } catch (err) {
    throw new Error("Error in getUserByIdService: " + err.message);
  }
};

// ---- GET USER BY EMAIL ----
export const getUserByEmailService = async (email) => {
  try {
    return await userRepo.getUserByEmailRepo(email);
  } catch (err) {
    throw new Error("Error in getUserByEmailService: " + err.message);
  }
};

// ---- UPDATE USER ----
export const updateUserService = async (id, first_name, last_name) => {
  try {
    return await userRepo.updateUserRepo(id, first_name, last_name);
  } catch (err) {
    throw new Error("Error in updateUserService: " + err.message);
  }
};

// ---- DELETE USER ----
export const deleteUserService = async (id) => {
  try {
    return await userRepo.deleteUserRepo(id);
  } catch (err) {
    throw new Error("Error in deleteUserService: " + err.message);
  }
};

// ---- CHANGE PASSWORD ----
export const changePasswordService = async (id, password) => {
  try {
    return await userRepo.changePasswordRepo(id, password);
  } catch (err) {
    throw new Error("Error in changePasswordService: " + err.message);
  }
};

// ---- CHANGE LIBRARIAN STATUS ----
export const changeLibrarianStatusService = async (id, status) => {
  try {
    return await userRepo.changeLibrarianStatusRepo(id, status);
  } catch (err) {
    throw new Error("Error in changeLibrarianStatusService: " + err.message);
  }
};

// ---- GET USERS BY ROLE ----
export const getUsersByRoleService = async (role) => {
  try {
    return await userRepo.getUsersByRoleRepo(role);
  } catch (err) {
    throw new Error("Error in getUsersByRoleService: " + err.message);
  }
};
