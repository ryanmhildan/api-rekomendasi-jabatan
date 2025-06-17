const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Register endpoint
router.post('/register', (req, res) => {
  const { username, password } = req.body;

  // Simpan user ke database jika perlu (dummy aja dulu)
  const user = { username, password };

  res.status(201).json({ message: 'User registered successfully', user });
});

// Login endpoint
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Validasi dummy (ganti dengan real DB nanti)
  if (username === 'admin' && password === 'admin') {
    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

module.exports = router;
