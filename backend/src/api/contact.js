const express = require('express');
const router = express.Router();
const { Contact } = require('../models/models');

/**
 * @swagger
 * tags:
 *   name: Contact
 *   description: Quản lý liên hệ
 */

/**
 * @swagger
 * /api/contact:
 *   post:
 *     summary: Gửi thông tin liên hệ
 *     tags: [Contact]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       200:
 *         description: Đã lưu liên hệ thành công
 *       500:
 *         description: Lỗi server
 */
router.post('/', async (req, res) => {
  try {
    const contact = await Contact.create(req.body);
    res.json(contact);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server!' });
  }
});

/**
 * @swagger
 * /api/contact:
 *   get:
 *     summary: Lấy danh sách liên hệ (cho admin)
 *     tags: [Contact]
 *     responses:
 *       200:
 *         description: Danh sách liên hệ
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *                   message:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Lỗi server
 */
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server!' });
  }
});

module.exports = router;