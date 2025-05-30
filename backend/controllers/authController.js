const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { Op } = require('sequelize');

exports.register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const existing = await User.findOne({ where: { username } });
    if (existing) return res.status(400).json({ msg: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashedPassword });

    res.status(201).json({ msg: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', err });
  }
};

exports.login = async (req, res) => {
  try {
    console.log("Login request body:", req.body);

    const { identifier, password } = req.body; // can be username or email

    if (!identifier || !password) {
      return res.status(400).json({ msg: "Missing credentials" });
    }

    // Try finding by username first, then fallback to email
    const user = await User.findOne({
      where: {
          [Op.or]: [
           { username: identifier },
           { email: identifier }
      ]
      }
    });

    console.log("Fetched user:", user);

    if (!user) return res.status(400).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match:", isMatch);

    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    });

    res.json({ token });

  } catch (err) {
    console.error("Login ERROR:", err);
    res.status(500).json({ msg: "Server error", err: err.message || err });
  }
};
