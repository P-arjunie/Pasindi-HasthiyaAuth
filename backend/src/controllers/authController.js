const pool = require('../models/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function register(req, res) {
  const { full_name, email, password } = req.body;
  if (!full_name || !email || !password) return res.status(400).json({ error: 'Missing fields' });
  if (!emailRegex.test(email)) return res.status(400).json({ error: 'Invalid email' });
  if (password.length < 6) return res.status(400).json({ error: 'Password too short' });

  try {
    const [rows] = await pool.execute('SELECT id FROM users WHERE email = ?', [email]);
    if (rows.length) return res.status(409).json({ error: 'User already exists' });

    const password_hash = await bcrypt.hash(password, 10);
    const [result] = await pool.execute(
      'INSERT INTO users (full_name, email, password_hash) VALUES (?, ?, ?)',
      [full_name, email, password_hash]
    );
    const insertedId = result.insertId;
    return res.status(201).json({ id: insertedId, full_name, email });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Missing fields' });

  try {
    const [rows] = await pool.execute(
      'SELECT id, password_hash, full_name, email FROM users WHERE email = ?',
      [email]
    );
    if (!rows.length) return res.status(401).json({ error: 'Invalid credentials' });

    const user = rows[0];
    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id }, jwtSecret, { expiresIn: '1h' });
    return res.json({ token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
}

async function getProfile(req, res) {
  const userId = req.user && req.user.id;
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const [rows] = await pool.execute(
      'SELECT id, full_name, email, created_at FROM users WHERE id = ?',
      [userId]
    );
    if (!rows.length) return res.status(404).json({ error: 'User not found' });
    const user = rows[0];
    return res.json({ id: user.id, full_name: user.full_name, email: user.email, created_at: user.created_at });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
}

module.exports = { register, login, getProfile };
