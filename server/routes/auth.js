const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const UserSchema = require('../models/User');

const dotenv = require('dotenv');
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'default_jwt_secret_for_dev';

// ✅ 회원가입 API
router.post('/register', [
  body('email', "Please enter a valid email").isEmail(),
  body('name', "Username should be at least 4 characters").isLength({ min: 4 }),
  body('password', "Password should be at least 8 characters").isLength({ min: 8 }),
  body('phone', "Phone number should be 10 digits").isLength({ min: 10 }),
], async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }

  try {
    const existingUser = await UserSchema.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(409).json({ error: "A user with this email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);

    const newUser = await UserSchema.create({
      email: req.body.email,
      name: req.body.name,
      password: hash,
      phone: req.body.phone,
      createdAt: new Date(),
    });

    const payload = { user: { id: newUser.id } };
    const authtoken = jwt.sign(payload, JWT_SECRET);
    res.json({ authtoken });

  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
});

// ✅ 로그인 API
router.post('/login', [
  body('email', "Please enter a valid email").isEmail(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const user = await UserSchema.findOne({ email: req.body.email });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    const payload = { user: { id: user.id } };
    const authtoken = jwt.sign(payload, JWT_SECRET);
    res.status(200).json({ authtoken });

  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
});

// ✅ 이메일 기반 유저 정보 조회
router.get('/user', async (req, res) => {
  try {
    const email = req.headers.email;
    if (!email) return res.status(400).json({ error: "Email header missing" });

    const user = await UserSchema.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    const { id, name, phone, role, createdAt, updatedAt } = user;
    res.json({ id, name, email, phone, role, createdAt, updatedAt });

  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
});

// ✅ 유저 정보 업데이트
router.put('/user', [
  body('name', "Username should be at least 4 characters").isLength({ min: 4 }),
  body('phone', "Phone number should be 10 digits").isLength({ min: 10 }),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const email = req.headers.email;
    if (!email) return res.status(400).json({ error: "Email header missing" });

    const user = await UserSchema.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    user.name = req.body.name;
    user.phone = req.body.phone;
    user.updatedAt = new Date();

    await user.save();

    const payload = { user: { id: user.id } };
    const authtoken = jwt.sign(payload, JWT_SECRET);
    res.json({ authtoken });

  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
