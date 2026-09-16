const pool = require("../db/connection");

async function createUser(name, email, passwordHash) {
  const [result] = await pool.execute(
    `
      INSERT INTO users (name, email, password_hash)
      VALUES (?, ?, ?)
    `,
    [name, email, passwordHash]
  );

  return result.insertId;
}

async function findUserByEmail(email) {
  const [rows] = await pool.execute(
    `
      SELECT id, name, email, password_hash, points, created_at
      FROM users
      WHERE email = ?
      LIMIT 1
    `,
    [email]
  );

  return rows[0] || null;
}

async function findUserById(id) {
  const [rows] = await pool.execute(
    `
      SELECT id, name, email, points, created_at
      FROM users
      WHERE id = ?
      LIMIT 1
    `,
    [id]
  );

  return rows[0] || null;
}

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
};