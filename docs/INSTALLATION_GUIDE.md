# 🚀 Hướng dẫn Cài đặt Ada FastFood

## 📋 Yêu cầu Hệ thống

### 🐳 **Docker Setup (Recommended):**
- **Docker** >= 20.0.0 ([Download](https://www.docker.com/get-started))
- **Docker Compose** >= 2.0.0 (đi kèm với Docker Desktop)
- **Git** ([Download](https://git-scm.com/))
- **4GB RAM** khả dụng cho containers

### 💻 **Manual Setup (Alternative):**
- **Node.js** >= 16.0.0 ([Download](https://nodejs.org/))
- **npm** >= 8.0.0 (đi kèm với Node.js)
- **MongoDB** >= 5.0 ([Download](https://www.mongodb.com/try/download/community))
- **Git**

### 🖥️ **Hệ điều hành hỗ trợ:**
- ✅ Windows 10/11
- ✅ macOS 10.15+
- ✅ Ubuntu 18.04+
- ✅ CentOS 7+

## 🐳 Cài đặt với Docker (Recommended)

### 1️⃣ **Kiểm tra Docker**

```bash
# Kiểm tra Docker
docker --version
# Expected: Docker version 20.x.x

# Kiểm tra Docker Compose
docker-compose --version
# Expected: Docker Compose version v2.x.x

# Kiểm tra Docker đang chạy
docker info
```

### 2️⃣ **Clone Repository**

```bash
# Clone project từ GitHub
git clone https://github.com/DanghuaPhuocHao/CongNghePhanMem.git

# Di chuyển vào thư mục dự án
cd CongNghePhanMem

# Kiểm tra các file Docker đã có
ls -la
# Expected files:
# - docker-compose.yml
# - backend/Dockerfile
# - frontend/Dockerfile
```

### 3️⃣ **Chạy Ứng dụng với Docker**

```bash
# Build và start tất cả services
docker-compose up --build

# Hoặc chạy background (detached mode)
docker-compose up --build -d

# Xem quá trình build và start
# Sẽ thấy logs của:
# - MongoDB starting
# - Backend building và starting
# - Frontend building và starting
```

### 4️⃣ **Verify Installation**

```bash
# Kiểm tra containers đang chạy
docker-compose ps

# Expected output:
#         Name                       Command               State           Ports         
# -------------------------------------------------------------------------------------
# ada_fastfood_backend    npm start                        Up      0.0.0.0:5000->5000/tcp
# ada_fastfood_frontend   npm start                        Up      0.0.0.0:3000->3000/tcp
# ada_fastfood_mongodb    docker-entrypoint.sh mongod      Up      0.0.0.0:27017->27017/tcp

# Test API health check
curl http://localhost:5000/api/health

# Hoặc mở browser test frontend
open http://localhost:3000
```

### 5️⃣ **Truy cập Ứng dụng**

- **🌐 Frontend:** http://localhost:3000
- **🔧 Backend API:** http://localhost:5000  
- **🗄️ MongoDB:** localhost:27017

## 🔧 Docker Commands Hữu ích

### Basic Operations:
```bash
# Xem logs realtime
docker-compose logs -f

# Xem logs của service cụ thể
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mongodb

# Stop tất cả services
docker-compose down

# Restart services
docker-compose restart

# Restart service cụ thể
docker-compose restart backend
```

### Development Commands:
```bash
# Rebuild images khi có thay đổi Dockerfile
docker-compose build --no-cache

# Chạy lại sau khi rebuild
docker-compose up -d

# Xem resource usage
docker stats

# Kiểm tra container health
docker ps -a
```

### Database Operations:
```bash
# Kết nối MongoDB shell
docker-compose exec mongodb mongosh ada_fastfood

# Chạy command trong container
docker-compose exec backend bash
docker-compose exec frontend sh

# Copy file vào/ra container
docker cp file.txt ada_fastfood_backend:/app/
docker cp ada_fastfood_backend:/app/logs ./
```

### Cleanup Commands:
```bash
# Stop và remove containers, networks
docker-compose down

# Remove containers, networks, volumes và images
docker-compose down --volumes --rmi all

# Clean up Docker system
docker system prune -a
```

## 💻 Manual Installation (Alternative)

### 1️⃣ **Cài đặt Dependencies**

```bash
# Clone repository
git clone https://github.com/DanghuaPhuocHao/CongNghePhanMem.git
cd CongNghePhanMem

# Backend setup
cd backend
npm install

# Frontend setup
cd ../frontend
npm install
```

### 2️⃣ **Setup Database**

```bash
# Start MongoDB (local installation required)
# Windows:
net start MongoDB

# macOS:
brew services start mongodb-community

# Linux:
sudo systemctl start mongod
```

### 3️⃣ **Chạy Ứng dụng**

```bash
# Terminal 1 - Backend
cd backend
npm start

# Terminal 2 - Frontend (new terminal)
cd frontend
npm start
```

## 🔧 Troubleshooting với Docker

### ❌ **Common Issues:**

#### **Port conflicts:**
```bash
# Kiểm tra port đang được sử dụng
# Windows:
netstat -ano | findstr :3000
netstat -ano | findstr :5000

# macOS/Linux:
lsof -ti:3000
lsof -ti:5000

# Stop conflicting services
docker-compose down
```

#### **Build failures:**
```bash
# Clean rebuild
docker-compose down
docker-compose build --no-cache
docker-compose up

# Check specific service logs
docker-compose logs backend
docker-compose logs frontend
```

#### **Database connection issues:**
```bash
# Check MongoDB container
docker-compose logs mongodb

# Restart MongoDB
docker-compose restart mongodb

# Reset database volume
docker-compose down -v
docker-compose up -d
```

#### **Container memory issues:**
```bash
# Check Docker memory settings
docker system df

# Increase Docker Desktop memory
# Settings > Resources > Memory: 4GB+

# Clean up unused resources
docker system prune -a
```

### 🐌 **Performance Issues:**

#### **Slow startup:**
```bash
# Check container resources
docker stats

# Reduce services for development
# Comment out services in docker-compose.yml temporarily
```

#### **Hot reload not working:**
```bash
# Check if volumes are mounted correctly
docker-compose config

# Restart frontend container
docker-compose restart frontend
```

## 🔒 Database Setup với Docker

### Khởi tạo dữ liệu mẫu:
```bash
# Kết nối MongoDB shell
docker-compose exec mongodb mongosh ada_fastfood

# Tạo admin user
db.users.insertOne({
  email: "admin@ada-fastfood.com",
  password: "$2a$10$example_hashed_password",
  fullName: "Admin User", 
  role: "admin",
  createdAt: new Date()
})

# Tạo sample products
db.products.insertMany([
  {
    name: "Burger Classic",
    description: "Burger truyền thống với thịt bò",
    price: 89000,
    image: "/uploads/burger-classic.jpg",
    stock: 50,
    isActive: true,
    createdAt: new Date()
  },
  {
    name: "Pizza Margherita",
    description: "Pizza với phô mai mozzarella",
    price: 129000, 
    image: "/uploads/pizza-margherita.jpg",
    stock: 30,
    isActive: true,
    createdAt: new Date()
  }
])

# Exit
exit
```

### Backup & Restore:
```bash
# Backup database
docker-compose exec mongodb mongodump --db ada_fastfood --out /backup

# Restore database  
docker-compose exec mongodb mongorestore /backup/ada_fastfood
```

## 🧪 Testing với Docker

### Run tests:
```bash
# Backend tests
docker-compose exec backend npm test

# Frontend tests  
docker-compose exec frontend npm test

# Run with coverage
docker-compose exec backend npm run test:coverage
```

### Debug mode:
```bash
# View detailed logs
docker-compose logs -f --tail=100 backend

# Run commands inside container
docker-compose exec backend bash
cd src && node app.js
```

## 🚀 Production với Docker

### Environment variables:
```bash
# Tạo .env file cho production
# DATABASE_URL=mongodb://mongodb:27017/ada_fastfood_prod
# NODE_ENV=production
# JWT_SECRET=your-production-secret

# Run production mode
docker-compose -f docker-compose.prod.yml up -d
```

### Health monitoring:
```bash
# Check all services
docker-compose ps

# Monitor resources
docker stats

# Check logs for errors
docker-compose logs | grep ERROR
```

## ✅ Verification Checklist

### 🔍 **After successful setup:**

#### **Backend API:**
- [ ] Health endpoint: `curl http://localhost:5000/api/health`
- [ ] Products endpoint: `curl http://localhost:5000/api/products`
- [ ] Database connection working
- [ ] File uploads working

#### **Frontend:**
- [ ] Home page loads: http://localhost:3000
- [ ] Navigation menu works
- [ ] API calls successful
- [ ] Hot reload working (development)

#### **Database:**
- [ ] MongoDB container running
- [ ] Database accessible via MongoDB shell
- [ ] Collections created
- [ ] Sample data inserted (optional)

### 🔧 **Manual Testing:**
1. **User Registration/Login**
2. **Product browsing**  
3. **Add to cart functionality**
4. **Order placement**
5. **Admin panel access** (if implemented)

## 📞 Support

### 🆘 **Need Help?**

1. **🐛 GitHub Issues:** [Report Docker problems](https://github.com/DanghuaPhuocHao/CongNghePhanMem/issues)
2. **📚 Check Logs:** `docker-compose logs -f`
3. **🐳 Docker Docs:** https://docs.docker.com/

### 🔗 **Useful Resources:**

- **Docker Compose Reference:** https://docs.docker.com/compose/
- **MongoDB Docker Hub:** https://hub.docker.com/_/mongo
- **Node.js Docker Best Practices:** https://nodejs.org/en/docs/guides/nodejs-docker-webapp/

---

**🎉 Chúc mừng! Ada FastFood đã chạy thành công với Docker!**

**Next Steps:**
1. 🎨 Test các tính năng của ứng dụng
2. 🧪 Thử nghiệm với dữ liệu mẫu
3. 🔧 Customize theo nhu cầu
4. 🚀 Deploy to production khi sẵn sàng
