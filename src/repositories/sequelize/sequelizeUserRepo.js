import {User as UserModel}  from "./db/models/userModelSequelize.js";

export const createUser = async (user) => {
  return await UserModel.create(user);
};

export const getAllUsersRepo = async () => {
  const users = await UserModel.findAll();
  return users.map((u) => u.dataValues);
};

export const getUserByIdRepo = async (id) => {
  const user = await UserModel.findByPk(id);
  return user ? user.dataValues : null;
};

export const getUserByEmailRepo = async (email) => {
  const user = await UserModel.findOne({ where: { email } });
  return user ? user.dataValues : null;
};

export const updateUserRepo = async (id, first_name, last_name) => {
  const user = await UserModel.findByPk(id);
  if (!user) return null;
  user.first_name = first_name;
  user.last_name = last_name;
  await user.save();
  return user.dataValues;
};

export const deleteUserRepo = async (id) => {
  const user = await UserModel.findByPk(id);
  if (!user) return false;
  await user.destroy();
  return true;
};

export const getUsersByRoleRepo = async (role) => {
  const users = await UserModel.findAll({ where: { role } });
  return users.map((u) => u.dataValues);
};

export const changePasswordRepo = async (id, password) => {
  const user = await UserModel.findByPk(id);
  if (!user) return false;
  user.password = password;
  await user.save();
  return true;
};

export const changeLibrarianStatusRepo = async (id, status) => {
  const user = await UserModel.findByPk(id);
  if (!user) return false;
  user.status = status.toUpperCase();
  await user.save();
  return true;
};
