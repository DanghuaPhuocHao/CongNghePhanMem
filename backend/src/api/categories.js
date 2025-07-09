const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Định nghĩa schema và model cho Category
const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }
});
const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Lấy danh sách tất cả danh mục
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Danh sách danh mục
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
 */
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: 'Lỗi lấy danh mục' });
  }
});

/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Thêm danh mục mới
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Danh mục vừa được tạo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *       400:
 *         description: Tên danh mục đã tồn tại
 */
router.post('/', async (req, res) => {
  try {
    console.log('POST /api/categories', req.body);
    const { name } = req.body;
    const newCategory = new Category({ name });
    await newCategory.save();
    res.json(newCategory);
  } catch (err) {
    console.error('Error:', err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Tên danh mục đã tồn tại!' });
    }
    res.status(500).json({ error: 'Lỗi thêm danh mục' });
  }
});

/**
 * @swagger
 * /api/categories/{id}:
 *   put:
 *     summary: Cập nhật tên danh mục
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID danh mục
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Danh mục đã được cập nhật
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *       500:
 *         description: Lỗi cập nhật danh mục
 */
router.put('/:id', async (req, res) => {
  try {
    const { name } = req.body;
    const updated = await Category.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Lỗi cập nhật danh mục' });
  }
});

/**
 * @swagger
 * /api/categories/{id}:
 *   delete:
 *     summary: Xóa danh mục
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID danh mục
 *     responses:
 *       200:
 *         description: Đã xóa danh mục
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Lỗi xóa danh mục
 */
router.delete('/:id', async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: 'Đã xóa danh mục' });
  } catch (err) {
    res.status(500).json({ error: 'Lỗi xóa danh mục' });
  }
});

module.exports = router;