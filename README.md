# 🏥 Hospital Equipment and Medicine Inventory System (HEMIS)

A comprehensive full-stack web application for managing hospital inventory, equipment maintenance, and supplier relationships.

## 📋 Project Overview

**HEMIS** is designed to automate the tracking of hospital assets, medical supplies, and medicines. The system enables administrators, pharmacists, and technicians to manage stock levels, monitor equipment maintenance schedules, and generate reports on usage and expiry dates.

### Key Features

- **Medicine Management**: Track medicines with expiry dates, stock levels, and batch numbers
- **Equipment Management**: Monitor equipment status, maintenance schedules, and service history
- **Supplier Management**: Maintain supplier information and contact details
- **Purchase Orders**: Create and track purchase orders for medicines and equipment
- **Maintenance Records**: Log and schedule equipment maintenance activities
- **Role-Based Access**: Different access levels for Admin, Pharmacist, and Technician roles
- **Real-time Alerts**: Notifications for low stock, expiring medicines, and maintenance due
- **Dashboard Analytics**: Visual overview of inventory status and alerts

## 🛠️ Technology Stack

### Backend
- **Framework**: Spring Boot 3.2.0
- **Database**: SQLite (file-based, no external server needed)
- **ORM**: Spring Data JPA with Hibernate
- **Security**: Spring Security with JWT authentication
- **Build Tool**: Maven

### Frontend
- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite
- **UI Library**: shadcn/ui + Tailwind CSS
- **HTTP Client**: Axios
- **Routing**: React Router v7
- **Icons**: Lucide React
- **Package Manager**: pnpm

## 📁 Project Structure

```
hospital/
├── backend/                    # Spring Boot backend
│   ├── src/main/java/com/hemis/
│   │   ├── controller/        # REST API endpoints
│   │   ├── service/           # Business logic
│   │   ├── repository/        # Data access layer
│   │   ├── entity/            # JPA entities
│   │   ├── dto/               # Data transfer objects
│   │   ├── security/          # JWT authentication
│   │   ├── config/            # Spring configuration
│   │   └── init/              # Data initialization
│   ├── src/main/resources/
│   │   └── application.properties
│   └── pom.xml
├── frontend/                   # React frontend
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── pages/             # Page components
│   │   ├── services/          # API services
│   │   ├── contexts/          # React contexts
│   │   ├── types/             # TypeScript types
│   │   └── lib/               # Utilities
│   ├── package.json
│   └── vite.config.ts
├── start-dev.sh               # Development start script
├── setup-env.sh               # Environment setup script
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- **Java 17** or higher
- **Maven** (or use included Maven wrapper)
- **Node.js 18+** and **pnpm**
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   cd /home/backer/Workspace/LARGE/hospital
   ```

2. **Setup environment**
   ```bash
   chmod +x setup-env.sh
   ./setup-env.sh
   ```

3. **Start the application**
   ```bash
   chmod +x start-dev.sh
   ./start-dev.sh
   ```

4. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8080

### Manual Start (Alternative)

**Backend:**
```bash
cd backend
./mvnw spring-boot:run
```

**Frontend:**
```bash
cd frontend
pnpm install
pnpm run dev
```

## 👤 Default Users

| Username   | Password  | Role        |
|------------|-----------|-------------|
| admin      | admin123  | ADMIN       |
| pharmacist | pharm123  | PHARMACIST  |
| technician | tech123  | TECHNICIAN  |

## 📚 API Endpoints

### Authentication
- `POST /api/auth/login` - User login

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics

### Medicines
- `GET /api/medicines` - List all medicines
- `POST /api/medicines` - Create medicine
- `PUT /api/medicines/{id}` - Update medicine
- `DELETE /api/medicines/{id}` - Delete medicine
- `GET /api/medicines/low-stock` - Get low stock medicines
- `GET /api/medicines/expiring` - Get expiring medicines

### Equipment
- `GET /api/equipment` - List all equipment
- `POST /api/equipment` - Create equipment
- `PUT /api/equipment/{id}` - Update equipment
- `DELETE /api/equipment/{id}` - Delete equipment
- `GET /api/equipment/maintenance-due` - Get equipment needing maintenance

### Suppliers
- `GET /api/suppliers` - List all suppliers
- `POST /api/suppliers` - Create supplier
- `PUT /api/suppliers/{id}` - Update supplier
- `DELETE /api/suppliers/{id}` - Delete supplier

### Purchase Orders
- `GET /api/orders` - List all orders
- `POST /api/orders` - Create order
- `PUT /api/orders/{id}` - Update order
- `DELETE /api/orders/{id}` - Delete order

### Maintenance Records
- `GET /api/maintenance` - List all maintenance records
- `POST /api/maintenance` - Create maintenance record
- `PUT /api/maintenance/{id}` - Update maintenance record
- `DELETE /api/maintenance/{id}` - Delete maintenance record

## 🎨 Features by Role

### Admin
- Full access to all features
- User management
- System-wide reports
- Supplier management

### Pharmacist
- Medicine inventory management
- Stock level monitoring
- Expiry date tracking
- Purchase order creation

### Technician
- Equipment management
- Maintenance record logging
- Equipment status updates
- Maintenance scheduling

## 📊 Database Schema

The application uses SQLite with the following main entities:

- **User**: System users with role-based access
- **Supplier**: Vendor information
- **Medicine**: Medicine inventory with expiry tracking
- **Equipment**: Hospital equipment with maintenance tracking
- **PurchaseOrder**: Purchase order management
- **MaintenanceRecord**: Equipment maintenance history

## 🔒 Security

- JWT-based authentication
- Token stored in localStorage
- Automatic token validation on each request
- Role-based access control
- Secure password hashing with BCrypt

## 🧪 Testing

Test the API using the included test credentials. The system includes:
- Pre-populated test data
- Sample medicines with varying expiry dates
- Sample equipment with different statuses
- Sample suppliers and purchase orders

## 📝 License

This is an educational project for UNILAK - MSIT6120 Advanced Programming Concepts.

## 👨‍💻 Author

Developed for University of Lay Adventists of Kigali (UNILAK)
Faculty of Computing and Information Technology
Module: MSIT6120 – Advanced Programming Concepts and Emerging Technologies

---

**Note**: This is a demonstration application built for educational purposes. Not intended for production use without additional security hardening and testing.
