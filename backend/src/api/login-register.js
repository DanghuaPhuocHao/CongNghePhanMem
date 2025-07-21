const express = require('express');
const router = express.Router();
const { User } = require('../models/models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Secret key cho JWT
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

// Middleware xác thực JWT
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Không có token xác thực!' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token không hợp lệ!' });
  }
}

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Đăng ký, đăng nhập, xác thực người dùng
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Đăng ký tài khoản mới
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Đăng ký thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     username:
 *                       type: string
 *                     role:
 *                       type: string
 *       400:
 *         description: Tên đăng nhập hoặc email đã tồn tại
 *       500:
 *         description: Lỗi server
 */
router.post('/register', async (req, res) => {
  try {
    const { username, email, phone, address, password } = req.body;
    // Kiểm tra trùng username hoặc email
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Tên đăng nhập hoặc email đã tồn tại!' });
    }
    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);
    // Tạo user mới
    const newUser = new User({
      username,
      email,
      phone,
      address,
      password: hashedPassword,
      role: 'user'
    });
    await newUser.save();
    // Tạo JWT cho user mới
    const token = jwt.sign(
      { _id: newUser._id, username: newUser.username, role: newUser.role },
      JWT_SECRET,
      { expiresIn: '1d' }
    );
    res.status(201).json({ message: 'Đăng ký thành công!', token, user: { _id: newUser._id, username: newUser.username, role: newUser.role } });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server!' });
  }
});

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Đăng nhập
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Đăng nhập thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     username:
 *                       type: string
 *                     role:
 *                       type: string
 *       400:
 *         description: Tên đăng nhập hoặc mật khẩu không đúng
 *       500:
 *         description: Lỗi server
 */
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    // Tìm user theo username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Tên đăng nhập hoặc mật khẩu không đúng!' });
    }
    // So sánh mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Tên đăng nhập hoặc mật khẩu không đúng!' });
    }
    // Tạo JWT khi đăng nhập thành công
    const token = jwt.sign(
      { _id: user._id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: '1d' }
    );
    res.json({
      message: 'Đăng nhập thành công!',
      token,
      user: { _id: user._id, username: user.username, role: user.role }
    });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server!' });
  }
});

/**
 * @swagger
 * /api/auth/profile:
 *   get:
 *     summary: Lấy thông tin user từ token (yêu cầu đăng nhập)
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Thông tin user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 username:
 *                   type: string
 *                 email:
 *                   type: string
 *                 phone:
 *                   type: string
 *                 address:
 *                   type: string
 *                 role:
 *                   type: string
 *       401:
 *         description: Không có token hoặc token không hợp lệ
 */
router.get('/profile', authMiddleware, async (req, res) => {
  // req.user chứa thông tin user từ token
  const user = await User.findById(req.user._id).select('-password');
  res.json(user);
});

/**
 * @swagger
 * /api/auth/profile:
 *   put:
 *     summary: Cập nhật thông tin cá nhân (yêu cầu đăng nhập)
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     username:
 *                       type: string
 *                     email:
 *                       type: string
 *                     phone:
 *                       type: string
 *                     address:
 *                       type: string
 *                     role:
 *                       type: string
 *       400:
 *         description: Email đã được sử dụng bởi user khác
 *       401:
 *         description: Không có token hoặc token không hợp lệ
 */
router.put('/profile', authMiddleware, async (req, res) => {
  try {
    const { email, phone, address } = req.body;
    const userId = req.user._id;

    // Kiểm tra email có bị trùng với user khác không
    if (email) {
      const existingUser = await User.findOne({ 
        email, 
        _id: { $ne: userId } // Loại trừ chính user hiện tại
      });
      if (existingUser) {
        return res.status(400).json({ message: 'Email đã được sử dụng bởi người dùng khác!' });
      }
    }

    // Cập nhật thông tin
    const updateData = {};
    if (email) updateData.email = email;
    if (phone) updateData.phone = phone;
    if (address) updateData.address = address;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true }
    ).select('-password');

    res.json({
      message: 'Cập nhật thông tin thành công!',
      user: updatedUser
    });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server!' });
  }
});

/**
 * @swagger
 * /api/auth/change-password:
 *   put:
 *     summary: Đổi mật khẩu (yêu cầu đăng nhập)
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               currentPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Đổi mật khẩu thành công
 *       400:
 *         description: Mật khẩu hiện tại không đúng
 *       401:
 *         description: Không có token hoặc token không hợp lệ
 */
router.put('/change-password', authMiddleware, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user._id;

    // Lấy user với password để verify
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: 'Người dùng không tồn tại!' });
    }

    // Kiểm tra mật khẩu hiện tại
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Mật khẩu hiện tại không đúng!' });
    }

    // Hash mật khẩu mới
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Cập nhật mật khẩu
    await User.findByIdAndUpdate(userId, { password: hashedNewPassword });

    res.json({ message: 'Đổi mật khẩu thành công!' });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server!' });
  }
});

module.exports = router;