const express = require('express');
const router = express.Router();
const { Order, User, Product } = require('../models/models');

/**
 * @swagger
 * tags:
 *   name: Overview
 *   description: Tổng quan hệ thống (thống kê)
 */

/**
 * @swagger
 * /api/overview:
 *   get:
 *     summary: Lấy thống kê tổng quan (đơn hàng, doanh thu, khách hàng, món bán chạy nhất)
 *     tags: [Overview]
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [day, week, month]
 *         required: true
 *         description: Loại thống kê (theo ngày, tuần, tháng)
 *     responses:
 *       200:
 *         description: Thống kê tổng quan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 orders:
 *                   type: number
 *                   description: Số đơn hàng
 *                 revenue:
 *                   type: string
 *                   description: Tổng doanh thu (đã format)
 *                 customers:
 *                   type: number
 *                   description: Số khách hàng mới
 *                 bestSeller:
 *                   type: string
 *                   description: Món bán chạy nhất
 *       400:
 *         description: Tham số không hợp lệ
 *       500:
 *         description: Lỗi server
 */
router.get('/', async (req, res) => {
  const { type } = req.query; // 'day', 'week', 'month'
  try {
    const now = new Date();
    let start, end;

    if (type === 'day') {
      start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      end = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    } else if (type === 'week') {
      const day = now.getDay() || 7;
      start = new Date(now.getFullYear(), now.getMonth(), now.getDate() - day + 1);
      end = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    } else if (type === 'month') {
      start = new Date(now.getFullYear(), now.getMonth(), 1);
      end = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    } else {
      return res.status(400).json({ message: 'Tham số không hợp lệ' });
    }

    // Đếm số đơn hàng
    const orders = await Order.find({ createdAt: { $gte: start, $lt: end } });
    const ordersCount = orders.length;

    // Tổng doanh thu
    const revenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);

    // Đếm số khách hàng mới
    const customersCount = await User.countDocuments({ createdAt: { $gte: start, $lt: end } });

    // Tìm món bán chạy nhất
    let bestSeller = '';
    if (orders.length > 0) {
      const productCount = {};
      orders.forEach(order => {
        order.products.forEach(item => {
          productCount[item.productId] = (productCount[item.productId] || 0) + item.quantity;
        });
      });
      const bestProductId = Object.keys(productCount).reduce((a, b) => productCount[a] > productCount[b] ? a : b);
      const bestProduct = await Product.findById(bestProductId);
      bestSeller = bestProduct ? bestProduct.name : '';
    }

    res.json({
      orders: ordersCount,
      revenue: revenue.toLocaleString('vi-VN') + 'đ',
      customers: customersCount,
      bestSeller: bestSeller || 'Không có dữ liệu'
    });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server!' });
  }
});

module.exports = router;