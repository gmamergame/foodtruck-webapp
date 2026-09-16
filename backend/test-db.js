const pool = require("./db/connection");

async function testDatabase() {
  try {
    const [rows] = await pool.query("SELECT 1 AS connected");

    console.log("Database connection successful!");
    console.log(rows);

    await pool.end();
  } catch (error) {
    console.error("Database connection failed:");
    console.error(error);
  }
}

testDatabase();