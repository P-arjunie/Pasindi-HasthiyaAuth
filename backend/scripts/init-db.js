const fs = require('fs');
const mysql = require('mysql2/promise');
const path = require('path');

(async () => {
  try {
    const schema = fs.readFileSync(path.join(__dirname, '..', 'schema.sql'), 'utf8');
    const conn = await mysql.createConnection({ host: 'localhost', user: 'root', password: '' });
    await conn.query("CREATE DATABASE IF NOT EXISTS hasthiya_auth");
    await conn.query('USE hasthiya_auth');
    // Split statements by semicolon and execute
    const statements = schema.split(/;\s*\n/).map(s => s.trim()).filter(Boolean);
    for (const stmt of statements) {
      await conn.query(stmt);
    }
    await conn.end();
    console.log('DB initialized');
    process.exit(0);
  } catch (e) {
    console.error('init DB error', e.message || e);
    process.exit(1);
  }
})();
