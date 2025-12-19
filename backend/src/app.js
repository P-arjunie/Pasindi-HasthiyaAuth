const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');

const app = express();
app.use(cors());
app.use(express.json());

app.use(authRoutes);

app.get('/', (req, res) => res.json({ ok: true }));

module.exports = app;
