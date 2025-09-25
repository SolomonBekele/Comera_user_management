import { readUsersFile, writeUsersFile } from "../file-storage/config/userConfig/userFileHanler.js";

export const createUser = async (user) => {
  const usersData = await readUsersFile();
  const parsedUsers = JSON.parse(usersData);
  parsedUsers.push(user);
  await writeUsersFile(JSON.stringify(parsedUsers, null, 2));
  return user;
};

export const getAllUsersRepo = async () => {
  const usersData = await readUsersFile();
  return JSON.parse(usersData);
};

export const getUserByIdRepo = async (id) => {
  const usersData = await readUsersFile();
  const parsedUsers = JSON.parse(usersData);
  return parsedUsers.find((u) => u.id === id) || null;
};

export const getUserByEmailRepo = async (email) => {
  const usersData = await readUsersFile();
  const parsedUsers = JSON.parse(usersData);
  return parsedUsers.find((u) => u.email === email) || null;
};

export const updateUserRepo = async (id, first_name, last_name) => {
  const usersData = await readUsersFile();
  const parsedUsers = JSON.parse(usersData);
  const index = parsedUsers.findIndex((u) => u.id === id);
  if (index !== -1) {
    parsedUsers[index].first_name = first_name;
    parsedUsers[index].last_name = last_name;
    await writeUsersFile(JSON.stringify(parsedUsers, null, 2));
    return parsedUsers[index];
  }
  return null;
};

export const deleteUserRepo = async (id) => {
  const usersData = await readUsersFile();
  const parsedUsers = JSON.parse(usersData);
  const index = parsedUsers.findIndex((u) => u.id === id);
  if (index !== -1) {
    parsedUsers.splice(index, 1);
    await writeUsersFile(JSON.stringify(parsedUsers, null, 2));
    return true;
  }
  return false;
};

export const getUsersByRoleRepo = async (role) => {
  const usersData = await readUsersFile();
  const parsedUsers = JSON.parse(usersData);
  return parsedUsers.filter((u) => u.role === role);
};

export const changePasswordRepo = async (id, password) => {
  const usersData = await readUsersFile();
  const parsedUsers = JSON.parse(usersData);
  const index = parsedUsers.findIndex((u) => u.id === id);
  if (index !== -1) {
    parsedUsers[index].password = password;
    await writeUsersFile(JSON.stringify(parsedUsers, null, 2));
    return true;
  }
  return false;
};

export const changeLibrarianStatusRepo = async (id, status) => {
  const usersData = await readUsersFile();
  const parsedUsers = JSON.parse(usersData);
  const index = parsedUsers.findIndex((u) => u.id === id);
  if (index !== -1) {
    parsedUsers[index].status = status.toUpperCase();
    await writeUsersFile(JSON.stringify(parsedUsers, null, 2));
    return true;
  }
  return false;
};
