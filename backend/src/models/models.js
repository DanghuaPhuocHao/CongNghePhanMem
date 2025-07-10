const { Schema, model, models } = require('mongoose');

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  address: { type: String },
  role: { type: String, default: 'customer' },
  createdAt: { type: Date, default: Date.now },
});

const ProductSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const OrderSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  products: [
    { 
      productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true }, 
      quantity: { type: Number, required: true },
      note: String,
    }
  ],
  totalAmount: { type: Number, required: true },
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

const ContactSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Xóa cache model trước khi tạo lại (tránh lỗi khi reload nhiều lần)
if (models.User) delete models.User;
if (models.Product) delete models.Product;
if (models.Order) delete models.Order;
if (models.Contact) delete models.Contact;

const User = model('User', UserSchema);
const Product = model('Product', ProductSchema);
const Order = model('Order', OrderSchema);
const Contact = model('Contact', ContactSchema);

module.exports = { User, Product, Order, Contact };