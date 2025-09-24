import pool from "../../config/db/mysqlConfig.js";

export const createUser = async (user) => {
  const sql = `INSERT INTO users 
    (id, first_name, last_name, email, password, role, language, status, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  await pool.query(sql, [
    user.id, user.first_name, user.last_name, user.email,
    user.password, user.role, user.language, user.status, user.created_at,
  ]);

  return user;
};

export const getAllUsersRepo = async () => {
  const [rows] = await pool.query("SELECT * FROM users");
  return rows;
};

export const getUserByIdRepo = async (id) => {
  const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
  return rows.length ? rows[0] : null;
};

export const getUserByEmailRepo = async (email) => {
  const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
  return rows.length ? rows[0] : null;
};

export const updateUserRepo = async (id, first_name, last_name) => {
  const sql = `UPDATE users SET first_name = ?, last_name = ? WHERE id = ?`;
  const [result] = await pool.query(sql, [first_name, last_name, id]);
  if (result.affectedRows === 0) return null;
  const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
  return rows.length ? rows[0] : null;
};

export const deleteUserRepo = async (id) => {
  const [result] = await pool.query("DELETE FROM users WHERE id = ?", [id]);
  return result.affectedRows > 0;
};

export const getUsersByRoleRepo = async (role) => {
  const [rows] = await pool.query("SELECT * FROM users WHERE role = ?", [role]);
  return rows;
};

export const changePasswordRepo = async (id, password) => {
  const sql = `UPDATE users SET password = ? WHERE id = ?`;
  const [result] = await pool.query(sql, [password, id]);
  return result.affectedRows > 0;
};

export const changeLibrarianStatusRepo = async (id, status) => {
  const sql = `UPDATE users SET status = ? WHERE id = ?`;
  const [result] = await pool.query(sql, [status.toUpperCase(), id]);
  return result.affectedRows > 0;
};
