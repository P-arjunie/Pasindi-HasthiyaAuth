const { port, db } = require('./config');
const mysql = require('mysql2/promise');

async function start() {
  try {
    // ensure database exists before loading app 
    const conn = await mysql.createConnection({
      host: db.host,
      user: db.user,
      password: db.password
    });
    await conn.query(`CREATE DATABASE IF NOT EXISTS \`${db.database}\``);
    await conn.end();

    const app = require('./app');
    app.listen(port, () => {
      console.log(`Backend running on http://localhost:${port}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

start();
