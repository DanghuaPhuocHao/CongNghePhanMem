# 🏗️ Kiến trúc Hệ thống Ada FastFood

## 📋 Tổng quan Kiến trúc

Ada FastFood sử dụng kiến trúc **3-tier đơn giản** với sự phân tách rõ ràng giữa Frontend, Backend và Database. Đây là kiến trúc monolithic phù hợp cho việc học tập và phát triển dự án nhỏ.

## 🎯 Nguyên tắc Thiết kế

### 🔧 **Đơn giản (Simplicity)**
- Kiến trúc dễ hiểu và maintain
- Công nghệ phổ biến và stable
- Setup và deployment đơn giản

### 🔄 **Phân tách rõ ràng (Separation of Concerns)**
- Frontend chỉ xử lý UI/UX
- Backend xử lý business logic
- Database lưu trữ dữ liệu

### 📚 **Học tập (Learning-Oriented)**
- Tập trung vào core concepts
- Dễ debug và troubleshoot
- Code structure rõ ràng

## 🏛️ Kiến trúc Tổng thể

```mermaid
graph TB
    subgraph "Client Tier"
        A[Web Browser]
        B[React App]
    end
    
    subgraph "Application Tier"
        C[Express.js Server]
        D[API Routes]
        E[Models]
    end
    
    subgraph "Data Tier"
        F[MongoDB Database]
        G[Collections]
    end
    
    A --> B
    B <--> C
    C --> D
    D --> E
    E <--> F
    F --> G
```

## 🎨 Frontend Architecture (React)

### 📁 **Cấu trúc Frontend**

```
frontend/src/
├── components/          # React Components
│   ├── App.jsx         # Main app component
│   ├── Header.jsx      # Navigation header
│   ├── Footer.jsx      # Footer component
│   └── admin/          # Admin-specific components
├── pages/              # Page-level components
│   ├── UserPage.jsx    # Customer homepage
│   ├── Login.jsx       # Login page
│   ├── Register.jsx    # Registration
│   ├── GioHang.jsx     # Shopping cart
│   └── admin/          # Admin pages
└── styles/             # CSS files
    ├── App.css
    ├── Header.css
    └── [component].css
```

### 🔄 **Component Flow**

```mermaid
graph TD
    A[App.jsx] --> B[Header.jsx]
    A --> C[Main Content]
    A --> D[Footer.jsx]
    
    C --> E[UserPage.jsx]
    C --> F[Login.jsx]
    C --> G[Register.jsx]
    C --> H[GioHang.jsx]
    C --> I[Admin Pages]
    
    B --> J[Navigation Menu]
    B --> K[User Status]
    
    E --> L[Product List]
    E --> M[Category Filter]
    
    H --> N[Cart Items]
    H --> O[Checkout Button]
```

### ⚛️ **React Architecture**

```mermaid
graph LR
    A[Browser] --> B[React App]
    B --> C[React Router]
    C --> D[Page Components]
    D --> E[Shared Components]
    E --> F[CSS Modules]
    
    B --> G[State Management]
    G --> H[Local State]
    G --> I[Props Passing]
    
    D --> J[API Calls]
    J --> K[Fetch/Axios]
    K --> L[Backend API]
```

## 🚀 Backend Architecture (Express)

### 📁 **Cấu trúc Backend**

```
backend/src/
├── app.js              # Main server file
├── routes/             # API route handlers
│   ├── auth.js        # Authentication routes
│   ├── products.js    # Product management
│   ├── users.js       # User management
│   └── orders.js      # Order processing
├── models/             # MongoDB models
│   ├── User.js        # User schema
│   ├── Product.js     # Product schema
│   └── Order.js       # Order schema
├── middleware/         # Express middleware
│   ├── auth.js        # Authentication check
│   └── upload.js      # File upload handling
└── uploads/            # Static file storage
```

### 🔌 **API Architecture**

```mermaid
graph LR
    A[Client Request] --> B[Express Server]
    B --> C[Middleware]
    C --> D[Route Handler]
    D --> E[Controller Logic]
    E --> F[Model/Database]
    F --> G[Response]
    G --> A
    
    C --> H[Auth Middleware]
    C --> I[CORS Middleware]
    C --> J[Body Parser]
```

### 📡 **API Endpoints Structure**

```mermaid
graph TD
    A[/api] --> B[/auth]
    A --> C[/users]
    A --> D[/products]
    A --> E[/orders]
    
    B --> B1[POST /login]
    B --> B2[POST /register]
    B --> B3[POST /logout]
    
    C --> C1[GET /profile]
    C --> C2[PUT /profile]
    
    D --> D1[GET /]
    D --> D2[POST / (admin)]
    D --> D3[PUT /:id (admin)]
    D --> D4[DELETE /:id (admin)]
    
    E --> E1[GET / (user orders)]
    E --> E2[POST / (create order)]
    E --> E3[GET /all (admin)]
```

## 🗄️ Database Architecture (MongoDB)

### 📊 **Database Schema**

```mermaid
erDiagram
    User ||--o{ Order : places
    User {
        ObjectId _id
        string email
        string password
        string fullName
        string phone
        string address
        string role
        date createdAt
        date updatedAt
    }
    
    Product ||--o{ OrderItem : contains
    Product {
        ObjectId _id
        string name
        string description
        number price
        string image
        string category
        number stock
        boolean isActive
        date createdAt
        date updatedAt
    }
    
    Order ||--o{ OrderItem : contains
    Order {
        ObjectId _id
        ObjectId userId
        array items
        number totalAmount
        string status
        string deliveryAddress
        string phone
        string notes
        date createdAt
        date updatedAt
    }
    
    OrderItem {
        ObjectId productId
        string productName
        number quantity
        number price
        number subtotal
    }
```

### 🔍 **Collections & Indexing**

```javascript
// Users Collection
db.users.createIndex({ "email": 1 }, { unique: true })
db.users.createIndex({ "role": 1 })

// Products Collection  
db.products.createIndex({ "name": "text", "description": "text" })
db.products.createIndex({ "category": 1, "isActive": 1 })
db.products.createIndex({ "price": 1 })

// Orders Collection
db.orders.createIndex({ "userId": 1, "createdAt": -1 })
db.orders.createIndex({ "status": 1 })
```

## 🔄 Data Flow Architecture

### 📊 **User Authentication Flow**

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant B as Backend
    participant D as Database
    
    U->>F: Enter credentials
    F->>B: POST /api/auth/login
    B->>D: Validate user
    D-->>B: User data
    B->>B: Create session
    B-->>F: Success + user info
    F->>F: Store user state
    F-->>U: Redirect to dashboard
```

### 🛒 **Product Purchase Flow**

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant B as Backend
    participant D as Database
    
    U->>F: Add to cart
    F->>F: Update cart state
    U->>F: Checkout
    F->>B: POST /api/orders
    B->>D: Create order
    D-->>B: Order saved
    B->>D: Update product stock
    B-->>F: Order confirmation
    F-->>U: Success message
```

### 🔧 **Admin Management Flow**

```mermaid
sequenceDiagram
    participant A as Admin
    participant F as Frontend
    participant B as Backend
    participant D as Database
    
    A->>F: Manage products
    F->>B: POST/PUT /api/products
    B->>B: Check admin role
    B->>D: Update product
    D-->>B: Success
    B-->>F: Updated data
    F->>F: Refresh UI
    F-->>A: Show changes
```

## 🔒 Security Architecture

### 🛡️ **Authentication & Authorization**

```mermaid
graph TD
    A[User Login] --> B[Credential Validation]
    B --> C[Session Creation]
    C --> D[Session Storage]
    
    E[API Request] --> F[Session Check]
    F --> G{Valid Session?}
    G -->|Yes| H[Process Request]
    G -->|No| I[Return 401]
    
    H --> J{Admin Required?}
    J -->|Yes| K[Check Role]
    J -->|No| L[Execute Logic]
    K --> M{Is Admin?}
    M -->|Yes| L
    M -->|No| N[Return 403]
```

### 🔐 **Security Layers**

1. **Client-Side Security:**
   - Input validation
   - XSS prevention
   - Secure form handling

2. **Server-Side Security:**
   - Session management
   - Password hashing (bcrypt)
   - Role-based access control
   - File upload validation

3. **Database Security:**
   - MongoDB connection security
   - Data validation
   - Basic access control

## 📁 File Upload Architecture

### 📂 **File Storage Strategy**

```mermaid
graph LR
    A[Client Upload] --> B[Multer Middleware]
    B --> C[File Validation]
    C --> D[Save to /uploads]
    D --> E[Return File Path]
    E --> F[Store Path in DB]
    
    G[Client Request Image] --> H[Express Static]
    H --> I[Serve from /uploads]
```

### 🖼️ **Image Handling**

```javascript
// File upload configuration
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

// File validation
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true)
  } else {
    cb(new Error('Only image files allowed'))
  }
}
```

## 🚀 Deployment Architecture

### 🏗️ **Development Setup**

```mermaid
graph TD
    A[Local Development] --> B[Frontend Dev Server]
    A --> C[Backend Dev Server]
    A --> D[Local MongoDB]
    
    B --> E[React Hot Reload]
    C --> F[Nodemon Auto Restart]
    D --> G[Local Data Storage]
```

### 📦 **Production Deployment**

```mermaid
graph TD
    A[Build Process] --> B[Frontend Build]
    A --> C[Backend Preparation]
    
    B --> D[Static Files]
    C --> E[Express Server]
    
    D --> F[Web Hosting]
    E --> G[Node.js Hosting]
    
    F --> H[Serve React App]
    G --> I[API Server]
    
    I --> J[MongoDB Atlas]
```

## 🔧 Technology Integration

### 📚 **Frontend Technologies**

```mermaid
graph LR
    A[React 17] --> B[JSX Components]
    B --> C[CSS Styling]
    C --> D[FontAwesome Icons]
    
    A --> E[React Router]
    E --> F[Client-side Routing]
    
    A --> G[State Management]
    G --> H[useState/useEffect]
```

### 🚀 **Backend Technologies**

```mermaid
graph LR
    A[Node.js] --> B[Express.js]
    B --> C[Middleware Stack]
    C --> D[Route Handlers]
    
    B --> E[MongoDB Connection]
    E --> F[Mongoose ODM]
    F --> G[Schema Models]
```

## 📈 Performance Considerations

### ⚡ **Frontend Performance**
- Component lazy loading (future)
- Image optimization
- CSS optimization
- Bundle size management

### 🚀 **Backend Performance**
- Database query optimization
- Connection pooling
- Response caching (future)
- Error handling optimization

### 🗄️ **Database Performance**
- Proper indexing
- Query optimization
- Connection management
- Data validation

## 🔄 Development Workflow

### 👨‍💻 **Development Process**

```mermaid
graph LR
    A[Code Changes] --> B[Local Testing]
    B --> C[Git Commit]
    C --> D[GitHub Push]
    D --> E[GitHub Actions]
    E --> F[Build & Test]
    F --> G[Deploy (Manual)]
```

### 🧪 **Testing Strategy**
- Manual testing
- Basic unit tests (future)
- Integration testing (future)
- User acceptance testing

---

**🏗️ Kiến trúc này được thiết kế đơn giản nhưng hiệu quả, phù hợp cho việc học tập và phát triển dự án nhỏ. Có thể mở rộng và cải tiến trong tương lai.**
