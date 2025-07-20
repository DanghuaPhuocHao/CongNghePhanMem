# 🍔 Ada FastFood - Hệ thống Quản lý Nhà hàng Thức ăn Nhanh

## 📖 Mô tả Dự án

**Ada FastFood** là ứng dụng web fullstack quản lý nhà hàng thức ăn nhanh, được xây dựng với React.js và Node.js. Hệ thống cung cấp giao diện đặt món trực tuyến cho khách hàng và công cụ quản lý cho admin.

### 🎯 Tính năng hiện có

#### 👥 **Khách hàng:**
- 🔐 Đăng ký/Đăng nhập
- 🍕 Xem menu sản phẩm
- 🛒 Thêm sản phẩm vào giỏ hàng
- 📱 Đặt hàng online
- 👤 Quản lý thông tin cá nhân

#### 🔧 **Quản trị viên:**
- 📊 Dashboard quản lý
- 🍔 Quản lý sản phẩm (CRUD)
- 📋 Quản lý đơn hàng
- 👥 Quản lý người dùng

### 🛠️ Tech Stack

```
Frontend:  React 17 + React Router + FontAwesome + CSS3
Backend:   Node.js + Express.js + MongoDB + Mongoose
Auth:      Basic session-based authentication
```

## 🚀 Quick Start

### 📋 Yêu cầu:
- **Node.js** >= 16.0.0
- **npm** >= 8.0.0
- **MongoDB** (local hoặc Atlas)

### ⚡ Cài đặt và chạy:

```bash
# 1. Clone repository
git clone https://github.com/DanghuaPhuocHao/CongNghePhanMem.git
cd CongNghePhanMem

# 2. Cài đặt Backend
cd backend
npm install

# 3. Cài đặt Frontend
cd ../frontend
npm install

# 4. Chạy MongoDB (nếu dùng local)
mongod

# 5. Chạy Backend (Terminal 1)
cd backend
npm start

# 6. Chạy Frontend (Terminal 2)
cd frontend
npm start
```

### 🌐 Truy cập ứng dụng:
- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:5000

## 🏗️ Kiến trúc Hệ thống

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React App     │    │   Express API   │    │   MongoDB       │
│   (Port 3000)   │◄──►│   (Port 5000)   │◄──►│   (Port 27017)  │
│   - Components  │    │   - Routes      │    │   - Collections │
│   - Pages       │    │   - Models      │    │   - Documents   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 📁 Cấu trúc Dự án

```
ada_fastfood/
├── 📁 frontend/                    # React Application
│   ├── 📄 package.json
│   ├── 📁 public/
│   ├── 📁 src/
│   │   ├── 📁 components/         # React components
│   │   │   ├── App.jsx           # Main app
│   │   │   ├── Header.jsx        # Navigation
│   │   │   ├── Footer.jsx        # Footer
│   │   │   └── admin/            # Admin components
│   │   ├── 📁 pages/             # Page components
│   │   │   ├── UserPage.jsx      # Customer page
│   │   │   ├── Login.jsx         # Login page
│   │   │   ├── Register.jsx      # Register page
│   │   │   ├── GioHang.jsx       # Cart page
│   │   │   └── admin/            # Admin pages
│   │   └── 📁 styles/            # CSS files
│
├── 📁 backend/                     # Express.js API
│   ├── 📄 package.json
│   ├── 📁 src/
│   │   ├── 🚀 app.js             # Main server file
│   │   ├── 📁 routes/            # API routes
│   │   ├── 📁 models/            # MongoDB models
│   │   └── 📁 middleware/        # Express middleware
│   └── 📁 uploads/               # File uploads
│
└── 📁 .github/                     # GitHub Actions
    └── 📁 workflows/
        ├── backend.yml           # Backend CI
        ├── frontend.yml          # Frontend CI
        └── docker.yml            # Docker build
```

## 🔧 Cấu hình Backend

### Database Connection:
Backend sử dụng MongoDB với Mongoose ODM. Cấu hình kết nối database trong `backend/src/app.js`.

### API Routes:
- Authentication endpoints
- User management
- Product management  
- Order processing

## ⚛️ Cấu hình Frontend

### React Components:
- Functional components với React Hooks
- React Router cho navigation
- CSS modules cho styling
- FontAwesome cho icons

### Pages hiện có:
- HomePage / UserPage
- Login / Register
- Product listing
- Shopping Cart (GioHang)
- Admin dashboard

## 🧪 Testing

```bash
# Backend tests (nếu có)
cd backend
npm test

# Frontend tests (nếu có)
cd frontend  
npm test
```

## 📊 GitHub Actions

Dự án có các workflow CI/CD cơ bản:

1. **Backend CI** - Kiểm tra backend code
2. **Frontend CI** - Kiểm tra frontend code  
3. **Docker Build** - Build Docker images

## 🚀 Deployment

### Manual Deployment:
```bash
# Build frontend
cd frontend
npm run build

# Deploy backend to server
cd backend
npm start
```

### Docker (cơ bản):
```bash
# Build images
docker build -t ada-fastfood-backend ./backend
docker build -t ada-fastfood-frontend ./frontend

# Run containers
docker run -p 5000:5000 ada-fastfood-backend
docker run -p 3000:3000 ada-fastfood-frontend
```

## 📚 API Endpoints (cơ bản)

```
GET    /api/products        # Lấy danh sách sản phẩm
POST   /api/products        # Tạo sản phẩm mới (admin)
GET    /api/users           # Lấy thông tin user
POST   /api/auth/login      # Đăng nhập
POST   /api/auth/register   # Đăng ký
```

## 🤝 Contributing

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/new-feature`)
3. Commit changes (`git commit -m 'Add new feature'`)
4. Push to branch (`git push origin feature/new-feature`)
5. Tạo Pull Request

## 👥 Team

| Role | Name | GitHub |
|------|------|---------|
| **Project Owner** | Danghua Phuoc Hao | [@DanghuaPhuocHao](https://github.com/DanghuaPhuocHao) |
| **Developer** | Nguyen Phuc An | [@phucan22](https://github.com/phucan22) |

## 🔗 Links

- **📚 Project Repository:** [GitHub](https://github.com/DanghuaPhuocHao/CongNghePhanMem)
- **🐛 Issues:** [GitHub Issues](https://github.com/DanghuaPhuocHao/CongNghePhanMem/issues)

---

<div align="center">

**🍔 Made with ❤️ by Ada FastFood Team**

</div>