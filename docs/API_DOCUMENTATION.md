# 📚 API Documentation - Ada FastFood

## 🔗 Base Information

### Base URL:
```
Development: http://localhost:5000/api
```

### Content Type:
```
Content-Type: application/json
```

### Authentication:
```
Session-based authentication
Cookie: connect.sid=<session_id>
```

## 🔐 Authentication

### 📝 **POST /api/auth/register**
Đăng ký tài khoản mới

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "fullName": "Nguyen Van A",
  "phone": "0123456789",
  "address": "123 ABC Street, Ho Chi Minh City"
}
```

**Response Success (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "_id": "64f8a1b2c3d4e5f678901234",
    "email": "user@example.com",
    "fullName": "Nguyen Van A",
    "phone": "0123456789",
    "address": "123 ABC Street, Ho Chi Minh City",
    "role": "customer",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Response Error (400):**
```json
{
  "success": false,
  "message": "Email already exists"
}
```

---

### 🔑 **POST /api/auth/login**
Đăng nhập hệ thống

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response Success (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "_id": "64f8a1b2c3d4e5f678901234",
    "email": "user@example.com",
    "fullName": "Nguyen Van A",
    "role": "customer"
  }
}
```

**Response Error (401):**
```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

---

### 🚪 **POST /api/auth/logout**
Đăng xuất

**Response Success (200):**
```json
{
  "success": true,
  "message": "Logout successful"
}
```

## 👤 User Management

### 👤 **GET /api/users/profile**
Lấy thông tin profile người dùng hiện tại

**Headers:**
```
Cookie: connect.sid=<session_id>
```

**Response Success (200):**
```json
{
  "success": true,
  "user": {
    "_id": "64f8a1b2c3d4e5f678901234",
    "email": "user@example.com",
    "fullName": "Nguyen Van A",
    "phone": "0123456789",
    "address": "123 ABC Street, Ho Chi Minh City",
    "role": "customer",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

---

### ✏️ **PUT /api/users/profile**
Cập nhật thông tin profile

**Request Body:**
```json
{
  "fullName": "Nguyen Van B",
  "phone": "0987654321",
  "address": "456 XYZ Street, Ho Chi Minh City"
}
```

**Response Success (200):**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "user": {
    "_id": "64f8a1b2c3d4e5f678901234",
    "email": "user@example.com",
    "fullName": "Nguyen Van B",
    "phone": "0987654321",
    "address": "456 XYZ Street, Ho Chi Minh City",
    "role": "customer",
    "updatedAt": "2024-01-15T11:30:00.000Z"
  }
}
```

## 🍔 Product Management

### 📋 **GET /api/products**
Lấy danh sách sản phẩm

**Query Parameters:**
- `category` (optional): Lọc theo danh mục
- `search` (optional): Tìm kiếm theo tên
- `page` (optional): Số trang (default: 1)
- `limit` (optional): Số items per page (default: 10)

**Example Request:**
```
GET /api/products?category=burger&search=chicken&page=1&limit=5
```

**Response Success (200):**
```json
{
  "success": true,
  "products": [
    {
      "_id": "64f8a1b2c3d4e5f678901235",
      "name": "Chicken Burger Deluxe",
      "description": "Juicy chicken breast with fresh vegetables",
      "price": 89000,
      "image": "/uploads/chicken-burger.jpg",
      "category": "burger",
      "stock": 50,
      "isActive": true,
      "createdAt": "2024-01-10T08:00:00.000Z",
      "updatedAt": "2024-01-10T08:00:00.000Z"
    },
    {
      "_id": "64f8a1b2c3d4e5f678901236",
      "name": "Beef Burger Classic",
      "description": "Premium beef patty with cheese and sauce",
      "price": 95000,
      "image": "/uploads/beef-burger.jpg",
      "category": "burger",
      "stock": 30,
      "isActive": true,
      "createdAt": "2024-01-10T08:30:00.000Z",
      "updatedAt": "2024-01-10T08:30:00.000Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 3,
    "totalProducts": 12,
    "hasNext": true,
    "hasPrev": false
  }
}
```

---

### 🔍 **GET /api/products/:id**
Lấy chi tiết sản phẩm

**Response Success (200):**
```json
{
  "success": true,
  "product": {
    "_id": "64f8a1b2c3d4e5f678901235",
    "name": "Chicken Burger Deluxe",
    "description": "Juicy chicken breast with fresh vegetables and special sauce",
    "price": 89000,
    "image": "/uploads/chicken-burger.jpg",
    "category": "burger",
    "stock": 50,
    "isActive": true,
    "createdAt": "2024-01-10T08:00:00.000Z",
    "updatedAt": "2024-01-10T08:00:00.000Z"
  }
}
```

**Response Error (404):**
```json
{
  "success": false,
  "message": "Product not found"
}
```

---

### ➕ **POST /api/products** (Admin Only)
Tạo sản phẩm mới

**Headers:**
```
Content-Type: multipart/form-data
Cookie: connect.sid=<admin_session_id>
```

**Form Data:**
```
name: "Pizza Margherita"
description: "Traditional pizza with tomato and mozzarella"
price: 120000
category: "pizza"
stock: 25
image: <file_upload>
```

**Response Success (201):**
```json
{
  "success": true,
  "message": "Product created successfully",
  "product": {
    "_id": "64f8a1b2c3d4e5f678901237",
    "name": "Pizza Margherita",
    "description": "Traditional pizza with tomato and mozzarella",
    "price": 120000,
    "image": "/uploads/1705312800000-pizza-margherita.jpg",
    "category": "pizza",
    "stock": 25,
    "isActive": true,
    "createdAt": "2024-01-15T12:00:00.000Z",
    "updatedAt": "2024-01-15T12:00:00.000Z"
  }
}
```

---

### ✏️ **PUT /api/products/:id** (Admin Only)
Cập nhật sản phẩm

**Request Body:**
```json
{
  "name": "Pizza Margherita Special",
  "description": "Traditional pizza with premium ingredients",
  "price": 135000,
  "stock": 20
}
```

**Response Success (200):**
```json
{
  "success": true,
  "message": "Product updated successfully",
  "product": {
    "_id": "64f8a1b2c3d4e5f678901237",
    "name": "Pizza Margherita Special",
    "description": "Traditional pizza with premium ingredients",
    "price": 135000,
    "image": "/uploads/1705312800000-pizza-margherita.jpg",
    "category": "pizza",
    "stock": 20,
    "isActive": true,
    "updatedAt": "2024-01-15T14:30:00.000Z"
  }
}
```

---

### 🗑️ **DELETE /api/products/:id** (Admin Only)
Xóa sản phẩm

**Response Success (200):**
```json
{
  "success": true,
  "message": "Product deleted successfully"
}
```

## 📦 Order Management

### 📋 **GET /api/orders**
Lấy danh sách đơn hàng của user hiện tại

**Response Success (200):**
```json
{
  "success": true,
  "orders": [
    {
      "_id": "64f8a1b2c3d4e5f678901238",
      "userId": "64f8a1b2c3d4e5f678901234",
      "items": [
        {
          "productId": "64f8a1b2c3d4e5f678901235",
          "productName": "Chicken Burger Deluxe",
          "quantity": 2,
          "price": 89000,
          "subtotal": 178000
        },
        {
          "productId": "64f8a1b2c3d4e5f678901236",
          "productName": "Beef Burger Classic",
          "quantity": 1,
          "price": 95000,
          "subtotal": 95000
        }
      ],
      "totalAmount": 273000,
      "status": "pending",
      "deliveryAddress": "123 ABC Street, District 1, HCM City",
      "phone": "0123456789",
      "notes": "Extra sauce please",
      "createdAt": "2024-01-15T15:30:00.000Z",
      "updatedAt": "2024-01-15T15:30:00.000Z"
    }
  ]
}
```

---

### ➕ **POST /api/orders**
Tạo đơn hàng mới

**Request Body:**
```json
{
  "items": [
    {
      "productId": "64f8a1b2c3d4e5f678901235",
      "productName": "Chicken Burger Deluxe",
      "quantity": 2,
      "price": 89000
    },
    {
      "productId": "64f8a1b2c3d4e5f678901236",
      "productName": "Beef Burger Classic",
      "quantity": 1,
      "price": 95000
    }
  ],
  "deliveryAddress": "123 ABC Street, District 1, HCM City",
  "phone": "0123456789",
  "notes": "Extra sauce please"
}
```

**Response Success (201):**
```json
{
  "success": true,
  "message": "Order created successfully",
  "order": {
    "_id": "64f8a1b2c3d4e5f678901238",
    "userId": "64f8a1b2c3d4e5f678901234",
    "items": [
      {
        "productId": "64f8a1b2c3d4e5f678901235",
        "productName": "Chicken Burger Deluxe",
        "quantity": 2,
        "price": 89000,
        "subtotal": 178000
      },
      {
        "productId": "64f8a1b2c3d4e5f678901236",
        "productName": "Beef Burger Classic",
        "quantity": 1,
        "price": 95000,
        "subtotal": 95000
      }
    ],
    "totalAmount": 273000,
    "status": "pending",
    "deliveryAddress": "123 ABC Street, District 1, HCM City",
    "phone": "0123456789",
    "notes": "Extra sauce please",
    "createdAt": "2024-01-15T15:30:00.000Z"
  }
}
```

---

### 🔍 **GET /api/orders/:id**
Lấy chi tiết đơn hàng

**Response Success (200):**
```json
{
  "success": true,
  "order": {
    "_id": "64f8a1b2c3d4e5f678901238",
    "userId": "64f8a1b2c3d4e5f678901234",
    "items": [
      {
        "productId": "64f8a1b2c3d4e5f678901235",
        "productName": "Chicken Burger Deluxe",
        "quantity": 2,
        "price": 89000,
        "subtotal": 178000
      }
    ],
    "totalAmount": 178000,
    "status": "confirmed",
    "deliveryAddress": "123 ABC Street, District 1, HCM City",
    "phone": "0123456789",
    "notes": "Extra sauce please",
    "createdAt": "2024-01-15T15:30:00.000Z",
    "updatedAt": "2024-01-15T16:00:00.000Z"
  }
}
```

## 🔧 Admin APIs

### 📊 **GET /api/admin/dashboard** (Admin Only)
Lấy thống kê dashboard

**Response Success (200):**
```json
{
  "success": true,
  "stats": {
    "totalUsers": 156,
    "totalProducts": 45,
    "totalOrders": 234,
    "totalRevenue": 15750000,
    "todayOrders": 12,
    "todayRevenue": 1250000,
    "recentOrders": [
      {
        "_id": "64f8a1b2c3d4e5f678901238",
        "userId": "64f8a1b2c3d4e5f678901234",
        "totalAmount": 273000,
        "status": "pending",
        "createdAt": "2024-01-15T15:30:00.000Z"
      }
    ]
  }
}
```

---

### 📋 **GET /api/admin/orders** (Admin Only)
Lấy tất cả đơn hàng

**Query Parameters:**
- `status` (optional): Lọc theo trạng thái
- `page` (optional): Số trang
- `limit` (optional): Số items per page

**Response Success (200):**
```json
{
  "success": true,
  "orders": [
    {
      "_id": "64f8a1b2c3d4e5f678901238",
      "userId": {
        "_id": "64f8a1b2c3d4e5f678901234",
        "fullName": "Nguyen Van A",
        "email": "user@example.com",
        "phone": "0123456789"
      },
      "items": [
        {
          "productName": "Chicken Burger Deluxe",
          "quantity": 2,
          "price": 89000,
          "subtotal": 178000
        }
      ],
      "totalAmount": 178000,
      "status": "pending",
      "deliveryAddress": "123 ABC Street",
      "createdAt": "2024-01-15T15:30:00.000Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalOrders": 48
  }
}
```

---

### ✏️ **PUT /api/admin/orders/:id/status** (Admin Only)
Cập nhật trạng thái đơn hàng

**Request Body:**
```json
{
  "status": "confirmed"
}
```

**Available Status:**
- `pending` - Chờ xác nhận
- `confirmed` - Đã xác nhận
- `preparing` - Đang chuẩn bị
- `delivering` - Đang giao hàng
- `completed` - Hoàn thành
- `cancelled` - Đã hủy

**Response Success (200):**
```json
{
  "success": true,
  "message": "Order status updated successfully",
  "order": {
    "_id": "64f8a1b2c3d4e5f678901238",
    "status": "confirmed",
    "updatedAt": "2024-01-15T16:00:00.000Z"
  }
}
```

---

### 👥 **GET /api/admin/users** (Admin Only)
Lấy danh sách người dùng

**Response Success (200):**
```json
{
  "success": true,
  "users": [
    {
      "_id": "64f8a1b2c3d4e5f678901234",
      "email": "user@example.com",
      "fullName": "Nguyen Van A",
      "phone": "0123456789",
      "role": "customer",
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

## 📤 File Upload

### 🖼️ **POST /api/upload** (Admin Only)
Upload hình ảnh sản phẩm

**Headers:**
```
Content-Type: multipart/form-data
```

**Form Data:**
```
image: <file_upload>
```

**File Requirements:**
- **Allowed types:** jpg, jpeg, png, gif
- **Max size:** 5MB
- **Recommended dimensions:** 800x600px

**Response Success (200):**
```json
{
  "success": true,
  "message": "File uploaded successfully",
  "filePath": "/uploads/1705312800000-product-image.jpg",
  "fileName": "1705312800000-product-image.jpg"
}
```

**Response Error (400):**
```json
{
  "success": false,
  "message": "Only image files are allowed"
}
```

## ⚠️ Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Validation error",
  "errors": [
    {
      "field": "email",
      "message": "Email is required"
    },
    {
      "field": "password",
      "message": "Password must be at least 6 characters"
    }
  ]
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Please login to access this resource"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "message": "Access denied. Admin privileges required"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## 📝 Status Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 500 | Internal Server Error |

## 🧪 Testing APIs

### Using cURL:

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"admin123"}' \
  -c cookies.txt
```

**Get Products:**
```bash
curl -X GET http://localhost:5000/api/products \
  -H "Content-Type: application/json"
```

**Create Product (Admin):**
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{"name":"New Product","description":"Test product","price":50000,"category":"test","stock":10}'
```

### Using Postman:

1. Import collection từ `docs/postman/Ada_FastFood_API.json`
2. Set environment variables:
   - `base_url`: `http://localhost:5000/api`
3. Login để lấy session cookie
4. Test các endpoints

---

**📚 API Documentation này cung cấp thông tin đầy đủ về các endpoints hiện có trong hệ thống Ada FastFood. Sử dụng để phát triển frontend và testing.**
