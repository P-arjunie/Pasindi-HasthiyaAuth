const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  port: process.env.PORT || 4000,
  jwtSecret: process.env.JWT_SECRET ,
  db: {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD ,
    database: process.env.DB_NAME || 'hasthiya_auth',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  }
};
