const express = require('express');
const router = express.Router();
const { Order, User, Product } = require('../models/models');

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Quản lý đơn hàng
 */

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Lấy danh sách tất cả đơn hàng
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Thành công
 */
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find()
      .populate({ path: 'userId', select: 'username email' })
      .populate({ path: 'products.productId', select: 'name price' });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server!' });
  }
});

/**
 * @swagger
 * /api/orders/user/{userId}:
 *   get:
 *     summary: Lấy danh sách đơn hàng theo userId
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID người dùng
 *     responses:
 *       200:
 *         description: Thành công
 */
router.get('/user/:userId', async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId })
      .populate({ path: 'userId', select: 'username email' })
      .populate({ path: 'products.productId', select: 'name price' });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi lấy đơn hàng theo user!' });
  }
});

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Lấy chi tiết 1 đơn hàng theo id
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID đơn hàng
 *     responses:
 *       200:
 *         description: Thành công
 *       404:
 *         description: Không tìm thấy đơn hàng
 */
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate({ path: 'userId', select: 'username email' })
      .populate({ path: 'products.productId', select: 'name price' });
    if (!order) return res.status(404).json({ message: 'Không tìm thấy đơn hàng!' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server!' });
  }
});

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Thêm đơn hàng mới
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               products:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: string
 *                     quantity:
 *                       type: number
 *                     note:
 *                       type: string
 *               totalAmount:
 *                 type: number
 *     responses:
 *       200:
 *         description: Đặt hàng thành công
 *       400:
 *         description: Đơn hàng phải có ít nhất 1 sản phẩm
 */
router.post('/', async (req, res) => {
  try {
    const { userId, products, totalAmount } = req.body;
    if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: 'Đơn hàng phải có ít nhất 1 sản phẩm!' });
    }
    const newOrder = new Order(req.body);
    await newOrder.save();
    // Populate lại để trả về đầy đủ thông tin
    console.log('Order body:', req.body);
    const populatedOrder = await Order.findById(newOrder._id)
      .populate({ path: 'userId', select: 'username email' })
      .populate({ path: 'products.productId', select: 'name price' });
    res.json({ message: 'Đặt hàng thành công!', order: populatedOrder });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi thêm đơn hàng!' });
  }
});

/**
 * @swagger
 * /api/orders/{id}:
 *   put:
 *     summary: Cập nhật đơn hàng
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID đơn hàng
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Đơn hàng đã được cập nhật
 *       500:
 *         description: Lỗi cập nhật đơn hàng
 */
router.put('/:id', async (req, res) => {
  try {
    const updated = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi cập nhật đơn hàng!' });
  }
});

/**
 * @swagger
 * /api/orders/{id}:
 *   delete:
 *     summary: Xóa đơn hàng
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID đơn hàng
 *     responses:
 *       200:
 *         description: Đã xóa đơn hàng
 *       500:
 *         description: Lỗi xóa đơn hàng
 */
router.delete('/:id', async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: 'Đã xóa đơn hàng' });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi xóa đơn hàng!' });
  }
});

module.exports = router;