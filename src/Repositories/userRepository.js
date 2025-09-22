import { readUsersFile, writeUsersFile } from "../config/userConfig/userFileHanler.js";
import pool from "../config/db/mysqlConfig.js"; // MySQL pool
import { User as UserModel } from "../model/sequelize/userModelSequelize.js";

const STORAGE_TYPE = process.env.STORAGE_TYPE || "file"; // "file" | "mysql"

// ---- FILE BASED ----
const createUserFile = async (user) => {
  const usersData = await readUsersFile();
  const parsedUsers = JSON.parse(usersData);
  parsedUsers.push({ ...user });
  await writeUsersFile(JSON.stringify(parsedUsers, null, 2));
  return user;
};

// ---- MYSQL BASED ----
const createUserMySQL = async (user) => {
  const sql = `INSERT INTO users 
    (id, first_name, last_name, email, password, role, language, status, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  await pool.query(sql, [
    user.id,
    user.first_name,
    user.last_name,
    user.email,
    user.password,
    user.role,
    user.language,
    user.status,
    user.created_at,
  ]);

  return user;
};

export const createUser = async (user) => {
  if (STORAGE_TYPE === "sequelize") {
    return await UserModel.create(user);
  }
  else if (STORAGE_TYPE === "mysql") {
    return await createUserMySQL(user);
  } else {
    return await createUserFile(user);
  }
};

// ---- GET ALL USERS ----
export const getAllUsersRepo = async () => {
  if (STORAGE_TYPE === "sequelize") {
    return await UserModel.findAll();
  } else if (STORAGE_TYPE === "mysql") {
    const [rows] = await pool.query("SELECT * FROM users");
    return rows;
  } else {
    const usersData = await readUsersFile();
    return JSON.parse(usersData);
  }
};

// ---- GET USER BY ID ----
export const getUserByIdRepo = async (id) => {
  if (STORAGE_TYPE === "sequelize") {
    return await UserModel.findByPk(id);
  } else if (STORAGE_TYPE === "mysql") {
    const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
    return rows.length ? rows[0] : null;
  } else {
    const usersData = await readUsersFile();
    const parsedUsers = JSON.parse(usersData);
    return parsedUsers.find((u) => u.id === id) || null;
  }
};

// ---- GET USER BY EMAIL ----
export const getUserByEmailRepo = async (email) => {
  if (STORAGE_TYPE === "sequelize") {
    return await UserModel.findOne({ where: { email } });
  } else if (STORAGE_TYPE === "mysql") {
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    return rows.length ? rows[0] : null;
  } else {
    const usersData = await readUsersFile();
    const parsedUsers = JSON.parse(usersData);
    return parsedUsers.find((u) => u.email === email) || null;
  }
};

// ---- UPDATE USER ----
export const updateUserRepo = async (id, first_name, last_name) => {
  if (STORAGE_TYPE === "sequelize") {
    const user = await UserModel.findByPk(id);
    if (!user) return null;
    user.first_name = first_name;
    user.last_name = last_name;
    await user.save();
    return user;
  } else if (STORAGE_TYPE === "mysql") {
    const sql = `UPDATE users SET first_name = ?, last_name = ? WHERE id = ?`;
    const [result] = await pool.query(sql, [first_name, last_name, id]);
    if (result.affectedRows === 0) return null;
    const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
    return rows.length ? rows[0] : null;
  } else {
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
  }
};

// ---- DELETE USER ----
export const deleteUserRepo = async (id) => {
  if (STORAGE_TYPE === "sequelize") {
    const user = await UserModel.findByPk(id);
    if (!user) return false;
    await user.destroy();
    return true;
  } else if (STORAGE_TYPE === "mysql") {
    const [result] = await pool.query("DELETE FROM users WHERE id = ?", [id]);
    return result.affectedRows > 0;
  } else {
    const usersData = await readUsersFile();
    const parsedUsers = JSON.parse(usersData);
    const index = parsedUsers.findIndex((u) => u.id === id);
    if (index !== -1) {
      parsedUsers.splice(index, 1);
      await writeUsersFile(JSON.stringify(parsedUsers, null, 2));
      return true;
    }
    return false;
  }
};
export const getUsersByRoleRepo = async (role) => {
  if (STORAGE_TYPE === "sequelize") {
    return await UserModel.findAll({ where: { role } });
  } else if (STORAGE_TYPE === "mysql") {
    const sql = `SELECT * FROM users WHERE role = ?`;
    const [rows] = await pool.query(sql, [role]);
    return rows;
  } else {
    const usersData = await readUsersFile();
    const parsedUsers = JSON.parse(usersData);
    return parsedUsers.filter((u) => u.role === role);
  }
};

export const changePasswordRepo = async (id, password) => {
  if (STORAGE_TYPE === "sequelize") {
    const user = await UserModel.findByPk(id);
    if (!user) return false;
    user.password = password;
    await user.save();
    return true;
  } else if (STORAGE_TYPE === "mysql") {
    const sql = `UPDATE users SET password = ? WHERE id = ?`;
    const [result] = await pool.query(sql, [password, id]);
    return result.affectedRows > 0;
  } else {
    const usersData = await readUsersFile();
    const parsedUsers = JSON.parse(usersData);
    const index = parsedUsers.findIndex((u) => u.id === id);
    if (index !== -1) {
      parsedUsers[index].password = password;
      await writeUsersFile(JSON.stringify(parsedUsers, null, 2));
      return true;
    }
    return false;
  }
};
export const changeLibrarianStatusRepo = async (id, status) => {
  const upperStatus = status.toUpperCase();

  if (STORAGE_TYPE === "sequelize") {
    const user = await UserModel.findByPk(id);
    if (!user) return false;
    user.status = upperStatus;
    await user.save();
    return true;
  } else if (STORAGE_TYPE === "mysql") {
    const sql = `UPDATE users SET status = ? WHERE id = ?`;
    const [result] = await pool.query(sql, [upperStatus, id]);
    return result.affectedRows > 0;
  } else {
    const usersData = await readUsersFile();
    const parsedUsers = JSON.parse(usersData);
    const index = parsedUsers.findIndex((u) => u.id === id);
    if (index !== -1) {
      parsedUsers[index].status = upperStatus;
      await writeUsersFile(JSON.stringify(parsedUsers, null, 2));
      return true;
    }
    return false;
  }
};

