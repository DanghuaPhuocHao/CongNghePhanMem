const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const uploadsDir = path.join(__dirname, '..', '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Định nghĩa schema và model cho Product
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: String,
  price: { type: Number, required: true },
  category: String,
});
if (mongoose.models.Product) {
  delete mongoose.models.Product;
}
const Product = mongoose.model('Product', productSchema);

// Cấu hình lưu file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Quản lý sản phẩm
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Lấy danh sách tất cả sản phẩm
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Danh sách sản phẩm
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
 *                   image:
 *                     type: string
 *                   price:
 *                     type: number
 *                   category:
 *                     type: string
 */
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    console.log(products);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Lỗi lấy sản phẩm' });
  }
});

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Thêm sản phẩm mới
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Sản phẩm vừa được tạo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 image:
 *                   type: string
 *                 price:
 *                   type: number
 *                 category:
 *                   type: string
 *       500:
 *         description: Lỗi thêm sản phẩm
 */
router.post('/', upload.single('image'), async (req, res) => {
  try {
    console.log('req.file:', req.file);
    console.log('req.body:', req.body);
    const { name, price, category } = req.body;
    //const image = req.file ? `/uploads/${req.file.filename}` : '';
    const image = req.file ? `uploads/${req.file.filename}` : '';
    const newProduct = new Product({
      name,
      price: Number(price),
      category,
      image
    });
    await newProduct.save();
    res.json(newProduct);
  } catch (err) {
    console.error('Lỗi thêm sản phẩm:', err); 
    res.status(500).json({ error: err.message || 'Lỗi thêm sản phẩm' }); 
  }
});

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Cập nhật sản phẩm
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID sản phẩm
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Sản phẩm đã được cập nhật
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 image:
 *                   type: string
 *                 price:
 *                   type: number
 *                 category:
 *                   type: string
 *       500:
 *         description: Lỗi cập nhật sản phẩm
 */
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { name, price, category } = req.body;
    const updatedFields = {
      name,
      price: Number(price),
      category,
    };
    // Nếu có file mới, cập nhật đường dẫn ảnh
    if (req.file) {
      const product = await Product.findById(req.params.id);
      if (product?.image) {
        const oldImagePath = path.join(__dirname, '..', product.image);
        if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
      }
      //updatedFields.image = `/uploads/${req.file.filename}`;
      updatedFields.image = `uploads/${req.file.filename}`;
    }
    const updated = await Product.findByIdAndUpdate(req.params.id, updatedFields, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Lỗi cập nhật sản phẩm' });
  }
});

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Xóa sản phẩm
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID sản phẩm
 *     responses:
 *       200:
 *         description: Đã xóa sản phẩm
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Lỗi xóa sản phẩm
 */
router.delete('/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Đã xóa sản phẩm' });
  } catch (err) {
    res.status(500).json({ error: 'Lỗi xóa sản phẩm' });
  }
});

module.exports = router;