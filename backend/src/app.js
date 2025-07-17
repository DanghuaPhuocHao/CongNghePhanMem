const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

const cors = require('cors');


// Import các router
const { setRoutes } = require('./routes/index');
const loginRegisterRouter = require('./api/login-register');
const usersRouter = require('./api/users');
const ordersRouter = require('./api/orders');
const overviewRouter = require('./api/overview');
const productsRouter = require('./api/products');
//console.log('productsRouter loaded');
const uploadsPath = path.join(__dirname, '..', 'uploads');
console.log('Serving uploads from:', uploadsPath);
const categoriesRouter = require('./api/categories');
const contactRouter = require('./api/contact');

mongoose.connect('mongodb://mongo:27017/ada_fastfood', { 
/*mongoose.connect('mongodb://localhost:27017/ada_fastfood', { */
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Kết nối MongoDB thành công!'))
.catch((err) => console.error('Kết nối MongoDB thất bại:', err));

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Cho phép truy cập file tĩnh uploads
app.use('/uploads', express.static(uploadsPath));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Mount các router dưới tiền tố /api
app.use('/api/login-register', loginRegisterRouter);
app.use('/api/users', usersRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/overview', overviewRouter);
app.use('/api/products', productsRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/contact', contactRouter);
app.use('/api', setRoutes()); // Đặt sau cùng nếu là catch-all

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;