import { readUsersFile, writeUsersFile } from "../config/userConfig/userFileHanler.js";
import pool from "../config/db/mysqlConfig.js"; // MySQL pool
import fs from "fs";

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
  if (STORAGE_TYPE === "mysql") {
    return await createUserMySQL(user);
  } else {
    return await createUserFile(user);
  }
};

export const getAllUsersRepo = async () => {
  if (STORAGE_TYPE === "mysql") {
    const [rows] = await pool.query("SELECT * FROM users");
    return rows;
  } else {
    const usersData = await readUsersFile();
    return JSON.parse(usersData);
  }
};
export const getUserByIdRepo = async (id) => {
  if (STORAGE_TYPE === "mysql") {
    const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
    return rows.length ? rows[0] : null;
  } else {
    const usersData = await readUsersFile();
    const parsedUsers = JSON.parse(usersData);
    return parsedUsers.find((user) => user.id == id) || null;
  }
};
export const getUserByEmailRepo = async (email) => {
  if (STORAGE_TYPE === "mysql") {
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    return rows.length ? rows[0] : null;
  } else {
    const usersData = await readUsersFile();
    const parsedUsers = JSON.parse(usersData);
    return parsedUsers.find((user) => user.email === email) || null;
  }
};
export const updateUserRepo = async (id, first_name, last_name) => {
  if (STORAGE_TYPE === "mysql") {
    const sql = `
      UPDATE users 
      SET first_name = ?, last_name = ? 
      WHERE id = ?
    `;
    const [result] = await pool.query(sql, [first_name, last_name, id]);

    if (result.affectedRows === 0) {
      return null; // user not found
    }

    // return updated user
    const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
    return rows.length ? rows[0] : null;
  } else {
    const usersData = await readUsersFile();
    const parsedUsers = JSON.parse(usersData);

    const fetchedIndex = parsedUsers.findIndex((user) => user.id == id);
    if (fetchedIndex !== -1) {
      parsedUsers[fetchedIndex].first_name = first_name;
      parsedUsers[fetchedIndex].last_name = last_name;

      await writeUsersFile(JSON.stringify(parsedUsers, null, 2));
      return parsedUsers[fetchedIndex];
    }

    return null; // user not found
  }
};
export const deleteUserRepo = async (id) => {
  if (STORAGE_TYPE === "mysql") {
    const sql = `DELETE FROM users WHERE id = ?`;
    const [result] = await pool.query(sql, [id]);
    return result.affectedRows > 0; // true if deleted, false if not found
  } else {
    const usersData = await readUsersFile();
    const parsedUsers = JSON.parse(usersData);

    const fetchedIndex = parsedUsers.findIndex((user) => user.id == id);
    if (fetchedIndex !== -1) {
      parsedUsers.splice(fetchedIndex, 1);
      await writeUsersFile(JSON.stringify(parsedUsers, null, 2));
      return true;
    }

    return false; // user not found
  }
};
export const changePasswordRepo = async (id, password) => {
  if (STORAGE_TYPE === "mysql") {
    const sql = `
      UPDATE users 
      SET password = ? 
      WHERE id = ?
    `;
    const [result] = await pool.query(sql, [password, id]);
    return result.affectedRows > 0; // true if updated, false if not found
  } else {
    const usersData = await readUsersFile();
    const parsedUsers = JSON.parse(usersData);

    const fetchedIndex = parsedUsers.findIndex((user) => user.id == id);
    if (fetchedIndex !== -1) {
      parsedUsers[fetchedIndex].password = password;
      await writeUsersFile(JSON.stringify(parsedUsers, null, 2));
      return true;
    }

    return false; // user not found
  }
};
export const changeLibrarianStatusRepo = async (id, status) => {
  if (STORAGE_TYPE === "mysql") {
    const sql = `
      UPDATE users 
      SET status = ? 
      WHERE id = ?
    `;
    const [result] = await pool.query(sql, [status.toUpperCase(), id]);
    return result.affectedRows > 0; // true if updated, false if not found
  } else {
    const usersData = await readUsersFile();
    const parsedUsers = JSON.parse(usersData);

    const fetchedIndex = parsedUsers.findIndex((user) => user.id == id);
    if (fetchedIndex !== -1) {
      parsedUsers[fetchedIndex].status = status.toUpperCase();
      await writeUsersFile(JSON.stringify(parsedUsers, null, 2));
      return true;
    }

    return false; // user not found
  }
};
export const getUsersByRoleRepo = async (role) => {
  if (STORAGE_TYPE === "mysql") {
    const sql = `SELECT * FROM users WHERE role = ?`;
    const [rows] = await pool.query(sql, [role]);
    return rows;
  } else {
    const usersData = await readUsersFile();
    const parsedUsers = JSON.parse(usersData);
    return parsedUsers.filter((user) => user.role === role);
  }
};




