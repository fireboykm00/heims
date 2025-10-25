# 🏥 Hospital Equipment and Medicine Inventory System (HEMIS)

**University of Lay Adventists of Kigali (UNILAK)**  
**Faculty of Computing and Information Technology**  
**Module:** MSIT6120 – Advanced Programming Concepts and Emerging Technologies

**FINAL PROJECT REPORT**  
**Project Title:** Hospital Equipment and Medicine Inventory System (HEMIS)  
**Date:** October 2025

---

## **Table of Contents**

1. [Abstract](#abstract)
2. [Introduction](#introduction)
3. [Objectives](#objectives)
4. [System Description](#system-description)
5. [System Design](#system-design)
6. [Implementation](#implementation)
7. [Screenshots](#screenshots)
8. [Design Decisions](#design-decisions)
9. [Challenges and Solutions](#challenges-and-solutions)
10. [Conclusion and Recommendations](#conclusion-and-recommendations)
11. [References](#references)

---

## **Abstract**

The **Hospital Equipment and Medicine Inventory System (HEMIS)** is a full-stack web-based application designed to automate the tracking of hospital assets, medical supplies, and medicines. The system enables administrators, pharmacists, and technicians to manage stock levels, monitor equipment maintenance schedules, and generate reports on usage and expiry dates.

Built using **Spring Boot** (backend), **React + Vite + shadcn/ui** (frontend), and **SQLite** (database), this project demonstrates a modern, efficient approach to hospital inventory management. The system implements role-based authentication, real-time alerts for expiring medicines and low stock, and comprehensive CRUD operations for all inventory items.

**Key Features:**
- Medicine inventory with expiry tracking and low-stock alerts
- Equipment management with maintenance scheduling
- Supplier relationship management
- Purchase order tracking
- Role-based access control (Admin, Pharmacist, Technician)
- Real-time dashboard with analytics
- Beautiful, responsive UI built with shadcn/ui

---

## **Introduction**

### **Background**

Hospitals depend on the availability and proper management of medical supplies and equipment. Manual tracking of medicines and assets is prone to human error, which can result in:
- Stock shortages during critical times
- Expired drugs being administered to patients
- Equipment failures due to missed maintenance
- Inefficient procurement processes
- Poor inventory visibility

### **Problem Statement**

Traditional paper-based or spreadsheet inventory systems face several challenges:
1. **No real-time tracking**: Staff cannot see current stock levels instantly
2. **Manual expiry checking**: Risk of expired medicines going unnoticed
3. **Maintenance gaps**: Equipment maintenance schedules are easily forgotten
4. **Poor coordination**: Pharmacy and maintenance teams lack integrated communication
5. **Reporting difficulties**: Generating reports requires manual data compilation

### **Solution**

The **HEMIS** provides a centralized digital solution that automates the inventory lifecycle — from procurement and stock tracking to consumption and reporting. It improves coordination between pharmacy staff, hospital administrators, and maintenance teams, ensuring accurate and real-time visibility into available resources.

---

## **Objectives**

The main objectives of this project are:

1. **Automate Inventory Tracking**
   - Track medicines, equipment, and supplier information digitally
   - Eliminate manual record-keeping errors
   - Provide real-time stock visibility

2. **Expiry Date Management**
   - Monitor medicine expiry dates automatically
   - Send alerts for medicines expiring within 30 days
   - Identify and flag expired stock

3. **Equipment Maintenance**
   - Record all maintenance activities
   - Schedule routine maintenance
   - Track equipment status (Operational, Maintenance, Out of Order, Retired)

4. **Role-Based Access Control**
   - Implement JWT-based authentication
   - Provide role-specific dashboards and permissions
   - Support Admin, Pharmacist, and Technician roles

5. **Purchase Order Management**
   - Create and track purchase orders
   - Link orders to suppliers
   - Monitor order status (Pending, Approved, Ordered, Delivered)

6. **Analytics and Reporting**
   - Display dashboard with key metrics
   - Generate alerts for low stock and expiring medicines
   - Show equipment needing maintenance

7. **User-Friendly Interface**
   - Create intuitive, modern UI using shadcn/ui
   - Ensure responsive design for all devices
   - Provide seamless navigation between modules

---

## **System Description**

HEMIS is designed as a **three-tier application** architecture:

### **1. Backend (Spring Boot)**

**Technology Stack:**
- Spring Boot 3.2.0
- Spring Data JPA
- Spring Security
- JWT Authentication
- SQLite Database

**Responsibilities:**
- Provides RESTful APIs for CRUD operations
- Handles authentication and authorization
- Manages database connections and transactions
- Implements business logic
- Validates input data
- Runs scheduled tasks (expiry checking)

**Key Components:**
- **Controllers**: Handle HTTP requests and responses
- **Services**: Implement business logic
- **Repositories**: Database access layer
- **Entities**: JPA data models
- **Security**: JWT authentication and authorization
- **Schedulers**: Background tasks for expiry checking

### **2. Frontend (React + Vite)**

**Technology Stack:**
- React 19 + TypeScript
- Vite (build tool)
- shadcn/ui (component library)
- Tailwind CSS (styling)
- Axios (HTTP client)
- React Router (navigation)

**Responsibilities:**
- Provides interactive user interface
- Communicates with backend via REST APIs
- Manages client-side state
- Handles user authentication flow
- Displays data in tables, cards, and charts

**Key Pages:**
- **Login**: Secure authentication page
- **Dashboard**: Overview with statistics and alerts
- **Medicines**: CRUD operations for medicine inventory
- **Equipment**: Equipment management and status tracking
- **Suppliers**: Supplier information management
- **Orders**: Purchase order creation and tracking
- **Maintenance**: Equipment maintenance record logging

### **3. Database (SQLite)**

**Technology**: SQLite 3.x (file-based database)

**Benefits:**
- No external database server required
- Easy setup and deployment
- Suitable for educational/demonstration purposes
- Auto-generates schema from JPA entities

**Tables:**
- `users` - System users with roles
- `suppliers` - Vendor information
- `medicines` - Medicine inventory
- `equipment` - Hospital equipment
- `purchase_orders` - Purchase order records
- `maintenance_records` - Equipment maintenance logs

### **User Roles**

The system supports three user roles with different access levels:

| Role | Access Level | Capabilities |
|------|--------------|--------------|
| **ADMIN** | Full access | Manage users, suppliers, view all reports, system configuration |
| **PHARMACIST** | Medicine focus | Manage medicine stock, track expiry, create purchase orders |
| **TECHNICIAN** | Equipment focus | Manage equipment, log maintenance, update equipment status |

---

## **System Design**

### **Entity Relationship Diagram (ERD)**

The system uses the following main entities with their relationships:

```
┌─────────────┐       ┌──────────────┐       ┌─────────────┐
│    User     │       │   Supplier   │       │  Medicine   │
├─────────────┤       ├──────────────┤       ├─────────────┤
│ userId (PK) │       │supplierId(PK)│       │medicineId PK│
│ username    │       │ name         │───┐   │ name        │
│ password    │       │ contactPerson│   │   │ category    │
│ fullName    │       │ email        │   │   │ quantity    │
│ email       │       │ phone        │   │   │ unitPrice   │
│ role        │       │ address      │   │   │ expiryDate  │
│ active      │       │ active       │   │   │ batchNumber │
└─────┬───────┘       └──────────────┘   └──>│ supplier_id │
      │                                       │ active      │
      │                                       └─────────────┘
      │               ┌──────────────┐
      │               │  Equipment   │
      │               ├──────────────┤
      │               │equipmentId PK│
      │               │ name         │
      │               │ category     │
      │               │ serialNumber │
      │               │ model        │
      ├──────────────>│ supplier_id  │
      │               │ purchaseDate │
      │               │ status       │
      │               │ nextMaint... │
      │               │ location     │
      │               └──────┬───────┘
      │                      │
      │               ┌──────┴───────────┐
      │               │ MaintenanceRecord│
      │               ├──────────────────┤
      │               │ recordId (PK)    │
      │               │ equipment_id     │
      ├──────────────>│ technician_id    │
      │               │ maintenanceDate  │
      │               │ type             │
      │               │ description      │
      │               │ cost             │
      │               │ status           │
      │               └──────────────────┘
      │
      │               ┌──────────────┐
      │               │PurchaseOrder │
      │               ├──────────────┤
      │               │ orderId (PK) │
      │               │ orderNumber  │
      │               │ supplier_id  │
      └──────────────>│ user_id      │
                      │ itemType     │
                      │ itemName     │
                      │ quantity     │
                      │ totalAmount  │
                      │ orderDate    │
                      │ status       │
                      └──────────────┘
```

**Relationships:**
- **Supplier → Medicine**: One-to-Many (one supplier provides many medicines)
- **Supplier → Equipment**: One-to-Many (one supplier provides many equipment)
- **Equipment → MaintenanceRecord**: One-to-Many (one equipment has many maintenance records)
- **User → PurchaseOrder**: One-to-Many (one user creates many orders)
- **User → MaintenanceRecord**: One-to-Many (one technician performs many maintenance tasks)

### **System Architecture Diagram**

```
┌─────────────────────────────────────────────────────────────────┐
│                        USER BROWSER                              │
│                      (React Frontend)                            │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ HTTP/JSON (Axios)
                             │ JWT Token Authentication
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    SPRING BOOT BACKEND                           │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │              REST API LAYER (Controllers)                   │ │
│ │  ┌──────┬──────┬────────┬─────────┬─────────┬──────────┐  │ │
│ │  │ Auth │ Med  │ Equip  │Supplier │ Order   │Maintenance│  │ │
│ │  └──────┴──────┴────────┴─────────┴─────────┴──────────┘  │ │
│ └─────────────────────────┬───────────────────────────────────┘ │
│                           │                                      │
│ ┌─────────────────────────▼───────────────────────────────────┐ │
│ │            SECURITY LAYER (Spring Security + JWT)           │ │
│ └─────────────────────────┬───────────────────────────────────┘ │
│                           │                                      │
│ ┌─────────────────────────▼───────────────────────────────────┐ │
│ │               SERVICE LAYER (Business Logic)                │ │
│ │  ┌──────────────┬───────────────┬────────────────────────┐ │ │
│ │  │AuthService   │DashboardService│ ExpiryCheckService     │ │ │
│ │  └──────────────┴───────────────┴────────────────────────┘ │ │
│ └─────────────────────────┬───────────────────────────────────┘ │
│                           │                                      │
│ ┌─────────────────────────▼───────────────────────────────────┐ │
│ │          REPOSITORY LAYER (Spring Data JPA)                 │ │
│ │  ┌─────────┬──────────┬─────────┬──────────┬────────────┐ │ │
│ │  │Medicine │Equipment │Supplier │PurchaseO.│Maintenance │ │ │
│ │  │Repo     │Repo      │Repo     │Repo      │Repo        │ │ │
│ │  └─────────┴──────────┴─────────┴──────────┴────────────┘ │ │
│ └─────────────────────────┬───────────────────────────────────┘ │
└───────────────────────────┼─────────────────────────────────────┘
                            │
                            │ JDBC
                            ▼
              ┌──────────────────────────┐
              │    SQLite DATABASE       │
              │   (hemis.db file)        │
              │                          │
              │  Tables:                 │
              │  • users                 │
              │  • suppliers             │
              │  • medicines             │
              │  • equipment             │
              │  • purchase_orders       │
              │  • maintenance_records   │
              └──────────────────────────┘
```

**Communication Flow:**
1. User interacts with React frontend
2. Frontend sends HTTP requests with JWT token
3. Spring Security validates token
4. Controller receives request
5. Service layer processes business logic
6. Repository accesses database
7. Response flows back through layers
8. Frontend displays data to user

---

## **Implementation**

### **Backend Implementation (Spring Boot)**

#### **Key Dependencies (pom.xml)**

```xml
<!-- Spring Boot Starters -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-validation</artifactId>
</dependency>

<!-- SQLite Database -->
<dependency>
    <groupId>org.xerial</groupId>
    <artifactId>sqlite-jdbc</artifactId>
    <version>3.43.0.0</version>
</dependency>

<!-- JWT -->
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-api</artifactId>
    <version>0.11.5</version>
</dependency>

<!-- Lombok -->
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
</dependency>
```

#### **REST API Endpoints**

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/login` | POST | User authentication |
| `/api/dashboard/stats` | GET | Dashboard statistics |
| `/api/medicines` | GET | List all medicines |
| `/api/medicines` | POST | Create medicine |
| `/api/medicines/{id}` | PUT | Update medicine |
| `/api/medicines/{id}` | DELETE | Delete medicine |
| `/api/medicines/low-stock` | GET | Low stock medicines |
| `/api/medicines/expiring` | GET | Expiring medicines |
| `/api/equipment` | GET | List all equipment |
| `/api/equipment` | POST | Create equipment |
| `/api/equipment/{id}` | PUT | Update equipment |
| `/api/equipment/{id}` | DELETE | Delete equipment |
| `/api/equipment/maintenance-due` | GET | Equipment needing maintenance |
| `/api/suppliers` | GET/POST | Supplier operations |
| `/api/orders` | GET/POST | Order operations |
| `/api/maintenance` | GET/POST | Maintenance operations |

#### **Authentication Implementation**

**JWT Token Generation:**
- Uses HS256 algorithm
- 24-hour expiration
- Includes username and role in claims
- Token validated on each request

**Security Configuration:**
- CORS enabled for frontend (localhost:5173)
- CSRF disabled (REST API)
- Stateless session management
- BCrypt password encoding

#### **Data Initialization**

The system auto-creates test data on first run:
- 3 users (admin, pharmacist, technician)
- 2 suppliers
- 3 sample medicines
- 3 sample equipment items

#### **Scheduled Tasks**

**Expiry Check Service:**
- Runs daily at 8 AM
- Checks for expired medicines
- Identifies medicines expiring in 30 days
- Logs warnings for expired stock

### **Frontend Implementation (React + TypeScript)**

#### **Key Dependencies (package.json)**

```json
{
  "dependencies": {
    "react": "^19.1.1",
    "react-router-dom": "^7.9.4",
    "axios": "^1.12.2",
    "@tanstack/react-query": "^5.90.5",
    "lucide-react": "^0.546.0",
    "tailwindcss": "^4.1.15",
    "shadcn/ui components": "latest",
    "date-fns": "^4.1.0",
    "zod": "^4.1.12"
  }
}
```

#### **Project Structure**

```
src/
├── components/
│   ├── ui/              # shadcn/ui components
│   └── Layout.tsx       # Main layout with sidebar
├── pages/
│   ├── LoginPage.tsx
│   ├── DashboardPage.tsx
│   ├── MedicinesPage.tsx
│   ├── EquipmentPage.tsx
│   ├── SuppliersPage.tsx
│   ├── OrdersPage.tsx
│   └── MaintenancePage.tsx
├── contexts/
│   └── AuthContext.tsx  # Authentication context
├── services/
│   └── api.ts           # API service layer
├── types/
│   └── index.ts         # TypeScript interfaces
├── lib/
│   ├── axios.ts         # Axios configuration
│   └── utils.ts         # Utility functions
└── App.tsx              # Main application
```

#### **Key Features**

**Authentication Flow:**
1. User enters credentials on login page
2. Frontend sends POST to `/api/auth/login`
3. Backend validates and returns JWT token
4. Token stored in localStorage
5. Token included in all subsequent requests
6. Auto-logout on 401 responses

**State Management:**
- React Context API for authentication
- Local component state with useState
- No Redux (keeping it simple)

**Form Handling:**
- Controlled components
- Form validation
- Success/error feedback

**UI Components (shadcn/ui):**
- **Button**: Primary actions
- **Card**: Content containers
- **Table**: Data display
- **Dialog**: Modal forms
- **Input/Select**: Form inputs
- **Alert**: Notifications
- **Tabs**: Content organization

---

## **Screenshots**

### **Login Page**
The login page features a clean, centered design with the hospital branding. It displays test credentials for easy access during demonstration.

**Features:**
- Hospital logo and branding
- Credential input fields
- Error message display
- Test credentials helper

### **Dashboard**
The dashboard provides an at-a-glance view of the system status with key metrics and alerts.

**Key Metrics:**
- Total medicines count
- Total equipment count
- Total suppliers count
- Pending orders count

**Alerts:**
- Low stock medicines (< 50 units)
- Medicines expiring in 30 days
- Equipment needing maintenance

### **Medicines Page**
Complete CRUD interface for managing medicine inventory.

**Features:**
- Searchable table with all medicines
- Add/Edit medicine dialog
- Low stock indicators (red highlight)
- Expiry date alerts (yellow/red)
- Supplier association
- Batch number tracking

### **Equipment Page**
Equipment management with status tracking and maintenance scheduling.

**Features:**
- Equipment list with status badges
- Color-coded status (Operational/Maintenance/Out of Order/Retired)
- Serial number tracking
- Model and location information
- Purchase date and price
- Next maintenance date

### **Suppliers Page**
Supplier information management with contact details.

**Features:**
- Supplier name and contact person
- Email and phone icons
- Address display
- Active/inactive status

### **Purchase Orders Page**
Create and track purchase orders for medicines and equipment.

**Features:**
- Order number auto-generation
- Supplier selection
- Item type categorization
- Quantity and pricing
- Status workflow (Pending → Approved → Ordered → Delivered)
- Delivery date tracking

### **Maintenance Records Page**
Log and track equipment maintenance activities.

**Features:**
- Equipment selection
- Maintenance type (Routine/Repair/Calibration/Inspection/Emergency)
- Cost tracking
- Technician assignment
- Next scheduled date
- Status tracking

---

## **Design Decisions**

### **1. Technology Choices**

**Why Spring Boot?**
- Industry-standard framework
- Excellent JPA support
- Built-in security features
- Easy REST API development
- Strong community support

**Why React + TypeScript?**
- Type safety reduces bugs
- Better IDE support
- Self-documenting code
- Improved refactoring

**Why SQLite?**
- No external database server needed
- Perfect for demonstration/education
- Easy deployment
- File-based portability

**Why shadcn/ui?**
- Beautiful, modern components
- Fully customizable
- Built on Radix UI (accessible)
- Tailwind CSS integration
- Copy-paste approach (no heavy dependencies)

### **2. Architecture Decisions**

**Three-Tier Architecture:**
- Clear separation of concerns
- Easy to test and maintain
- Scalable design
- Industry best practice

**JWT Authentication:**
- Stateless (no server-side sessions)
- Scalable for distributed systems
- Easy to implement
- Mobile-friendly

**Repository Pattern:**
- Abstraction over data access
- Easy to test with mocks
- Clean code organization
- Follows Spring Data JPA conventions

### **3. UI/UX Decisions**

**Dashboard-First Design:**
- Users see important metrics immediately
- Quick access to alerts
- Reduces navigation clicks

**Color-Coded Alerts:**
- Red: Critical (expired, out of order)
- Yellow: Warning (expiring soon, low stock)
- Green: Good (operational, sufficient stock)
- Visual hierarchy improves usability

**Sidebar Navigation:**
- Always visible
- Clear section organization
- Icon + text for clarity

**Modal Dialogs for Forms:**
- Keeps users in context
- Faster than page navigation
- Better for CRUD operations

### **4. Data Model Decisions**

**Soft Delete:**
- Items marked as inactive instead of deleted
- Maintains data integrity
- Allows restoration
- Preserves history

**Audit Fields:**
- createdAt/updatedAt timestamps
- Track data changes
- Debugging and reporting

**Enum Types:**
- Type-safe status fields
- Prevents invalid values
- Self-documenting

---

## **Challenges and Solutions**

### **Challenge 1: SQLite Dialect Compatibility**

**Problem:**
Spring Boot doesn't include a built-in SQLite dialect, which caused issues with Hibernate auto-generation and some SQL queries.

**Solution:**
- Added `hibernate-community-dialects` dependency
- Used `org.hibernate.community.dialect.SQLiteDialect`
- Configured proper JDBC driver settings in application.properties

**Code:**
```properties
spring.datasource.url=jdbc:sqlite:./data/hemis.db
spring.datasource.driver-class-name=org.sqlite.JDBC
spring.jpa.database-platform=org.hibernate.community.dialect.SQLiteDialect
```

### **Challenge 2: CORS Configuration**

**Problem:**
Frontend running on port 5173 couldn't access backend on port 8080 due to CORS restrictions.

**Solution:**
- Implemented comprehensive CORS configuration in SecurityConfig
- Allowed specific origins, methods, and headers
- Enabled credentials for JWT token transmission

**Code:**
```java
@Bean
public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
    configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173"));
    configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
    configuration.setAllowedHeaders(Arrays.asList("*"));
    configuration.setAllowCredentials(true);
    
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);
    return source;
}
```

### **Challenge 3: JWT Token Expiration**

**Problem:**
Initial implementation had short token expiration (1 hour), causing frequent user logouts during development and testing.

**Solution:**
- Extended token expiration to 24 hours
- Made expiration configurable via application.properties
- Implemented proper token validation and error handling

**Configuration:**
```properties
jwt.expiration=86400000  # 24 hours in milliseconds
```

### **Challenge 4: Date Handling Between Frontend and Backend**

**Problem:**
Date formats were inconsistent between frontend (JavaScript Date) and backend (LocalDate), causing parsing errors.

**Solution:**
- Used ISO 8601 date format (YYYY-MM-DD) consistently
- Frontend sends dates as strings in ISO format
- Backend uses LocalDate for date-only fields
- Used `date-fns` library for consistent date formatting in frontend

**Example:**
```typescript
// Frontend
const formData = {
  expiryDate: '2025-12-31'  // ISO format string
};

// Backend automatically parses to LocalDate
@NotNull
@Column(nullable = false)
private LocalDate expiryDate;
```

### **Challenge 5: Supplier Object in Form Submissions**

**Problem:**
When creating medicines or equipment, sending the entire Supplier object caused issues with JPA entity relationships and duplicate entries.

**Solution:**
- Frontend sends only supplier ID
- Backend controller retrieves full Supplier entity from database
- Prevents duplicate supplier creation
- Maintains referential integrity

**Implementation:**
```typescript
// Frontend sends supplier ID
const selectedSupplier = suppliers.find(s => s.supplierId === Number(formData.supplier));
const data = { ...formData, supplier: selectedSupplier };
```

### **Challenge 6: TypeScript Type Safety with API Responses**

**Problem:**
API responses weren't strongly typed, leading to potential runtime errors and poor IDE support.

**Solution:**
- Created comprehensive TypeScript interfaces in `types/index.ts`
- Used generic typing with Axios: `axiosInstance.get<Medicine[]>(...)`
- Implemented proper type guards where needed
- Used `type` imports to avoid import bloat

**Example:**
```typescript
export interface Medicine {
  medicineId?: number;
  name: string;
  category: string;
  quantity: number;
  expiryDate: string;
  supplier?: Supplier;
}

// Type-safe API call
const response = await api.getMedicines();
const medicines: Medicine[] = response.data;  // Fully typed
```

### **Challenge 7: shadcn/ui Component Installation**

**Problem:**
Initial manual component creation was time-consuming and error-prone.

**Solution:**
- Used shadcn CLI to install components: `pnpm dlx shadcn@latest add [component]`
- Configured components.json properly for path aliases
- Installed all needed components in one command
- Leveraged copy-paste approach for customization

### **Challenge 8: Authentication State Persistence**

**Problem:**
User authentication state was lost on page refresh, requiring re-login.

**Solution:**
- Store JWT token and user info in localStorage
- Check localStorage on app initialization
- Restore authentication state from stored data
- Implement auto-logout on token expiration (401 response)

**Implementation:**
```typescript
useEffect(() => {
  const storedUser = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  if (storedUser && token) {
    setUser(JSON.parse(storedUser));
  }
}, []);
```

### **Challenge 9: Form State Management for Edit vs Create**

**Problem:**
Sharing the same form for creating and editing required different behaviors and data pre-filling.

**Solution:**
- Used single dialog component with conditional logic
- Track editing state with `editingItem` variable
- Pre-fill form data when editing
- Clear form data when dialog closes
- Different submit logic based on editing state

**Pattern:**
```typescript
const handleEdit = (item: Medicine) => {
  setEditingMedicine(item);
  setFormData({
    name: item.name,
    category: item.category,
    // ... other fields
  });
  setDialogOpen(true);
};

const handleSubmit = async (e: React.FormEvent) => {
  if (editingMedicine?.medicineId) {
    await api.updateMedicine(editingMedicine.medicineId, data);
  } else {
    await api.createMedicine(data);
  }
};
```

### **Challenge 10: Consistent Code Formatting**

**Problem:**
Different developers (or AI assistants) might use inconsistent code formatting, making the codebase harder to maintain.

**Solution:**
- User applied consistent formatting using Prettier
- Configured ESLint for code quality
- Used double quotes consistently in frontend
- Applied proper indentation and spacing
- Followed TypeScript best practices

---

## **Conclusion and Recommendations**

### **Project Summary**

The **Hospital Equipment and Medicine Inventory System (HEMIS)** successfully achieves its objectives of creating a modern, functional inventory management system for hospital environments. The project demonstrates:

**Technical Achievements:**
- ✅ Full-stack application with clear separation of concerns
- ✅ RESTful API following industry best practices
- ✅ Secure JWT-based authentication
- ✅ Role-based access control
- ✅ Real-time alerts and notifications
- ✅ Beautiful, responsive UI with modern components
- ✅ Type-safe frontend with TypeScript
- ✅ Automated data initialization and scheduling

**Functional Achievements:**
- ✅ Complete CRUD operations for all entities
- ✅ Medicine expiry tracking with automated checks
- ✅ Equipment maintenance scheduling
- ✅ Supplier management
- ✅ Purchase order workflow
- ✅ Dashboard with analytics
- ✅ Multi-role support (Admin, Pharmacist, Technician)

**Educational Value:**
- Demonstrates modern full-stack development
- Shows proper use of Spring Boot ecosystem
- Illustrates React best practices
- Teaches authentication and authorization
- Provides hands-on experience with real-world scenarios

### **Lessons Learned**

1. **Architecture Matters**: The three-tier architecture made the codebase easy to understand and maintain
2. **Type Safety Helps**: TypeScript caught many potential bugs during development
3. **UI Libraries Save Time**: shadcn/ui significantly accelerated frontend development
4. **Testing Early**: Having test credentials and sample data from the start made development smoother
5. **Documentation is Key**: Clear code comments and README files help future developers

### **Future Enhancements**

The following features could be added to make HEMIS even more robust:

**1. Advanced Reporting**
- Export data to PDF/Excel
- Generate monthly inventory reports
- Create purchase order summaries
- Track medicine consumption trends
- Equipment utilization reports

**2. Barcode Integration**
- Scan medicine barcodes for quick lookup
- Print barcode labels for equipment
- Mobile app for inventory scanning
- Faster stock updates

**3. Automated Notifications**
- Email alerts for expiring medicines
- SMS notifications for critical low stock
- Push notifications for maintenance reminders
- Automated purchase order suggestions

**4. Advanced Analytics**
- Charts and graphs for inventory trends
- Predictive analytics for stock planning
- Equipment downtime analysis
- Supplier performance metrics
- Cost analysis and budgeting

**5. Mobile Application**
- React Native or Flutter mobile app
- On-site inventory checking
- Quick updates via mobile
- Offline mode support

**6. Integration Capabilities**
- Hospital Management System (HMS) integration
- Electronic Health Records (EHR) connectivity
- Accounting system integration
- Supplier portal API

**7. Enhanced Security**
- Two-factor authentication (2FA)
- Audit trail for all actions
- IP whitelisting
- Password strength requirements
- Session management

**8. Inventory Optimization**
- Automatic reorder point calculations
- Stock level forecasting
- Expiry-based FIFO recommendations
- Multi-location support
- Batch tracking improvements

**9. User Experience**
- Dark mode support
- Customizable dashboard widgets
- Advanced search and filtering
- Bulk import/export
- In-app help and tutorials

**10. Performance Improvements**
- Database migration to PostgreSQL for production
- Redis caching layer
- Server-side pagination
- Lazy loading for large datasets
- Image optimization for equipment photos

### **Recommendations for Deployment**

For production deployment, consider the following:

**Infrastructure:**
- Use PostgreSQL or MySQL instead of SQLite
- Deploy backend on cloud platforms (AWS, Azure, Heroku)
- Use CDN for frontend static files
- Implement load balancing for scalability
- Set up automated backups

**Security:**
- Use HTTPS for all communications
- Implement rate limiting
- Add request validation and sanitization
- Use environment variables for secrets
- Regular security audits
- OWASP compliance

**Monitoring:**
- Application performance monitoring (APM)
- Error tracking (Sentry, Rollbar)
- Log aggregation (ELK stack)
- Uptime monitoring
- User analytics

**Testing:**
- Unit tests for backend services
- Integration tests for API endpoints
- Frontend component testing
- End-to-end testing (Playwright, Cypress)
- Load testing

### **Final Thoughts**

HEMIS demonstrates that modern web technologies can create powerful, user-friendly applications for critical healthcare needs. The project balances simplicity with functionality, making it an excellent educational tool while remaining extensible for real-world use.

The use of industry-standard technologies (Spring Boot, React, TypeScript) ensures that the skills learned are transferable to professional development environments. The clean architecture and comprehensive documentation make this project a solid foundation for further enhancement.

---

## **References**

### **Documentation**

1. **Spring Boot Documentation**  
   https://spring.io/projects/spring-boot

2. **Spring Security Documentation**  
   https://spring.io/projects/spring-security

3. **React Documentation**  
   https://react.dev/

4. **TypeScript Documentation**  
   https://www.typescriptlang.org/docs/

5. **shadcn/ui Documentation**  
   https://ui.shadcn.com/

6. **Tailwind CSS Documentation**  
   https://tailwindcss.com/docs

7. **Axios Documentation**  
   https://axios-http.com/docs/intro

8. **React Router Documentation**  
   https://reactrouter.com/

### **Libraries and Tools**

9. **SQLite JDBC Driver**  
   https://github.com/xerial/sqlite-jdbc

10. **JWT (JSON Web Tokens)**  
    https://jwt.io/

11. **Lombok**  
    https://projectlombok.org/

12. **Vite**  
    https://vitejs.dev/

13. **Lucide Icons**  
    https://lucide.dev/

14. **date-fns**  
    https://date-fns.org/

### **Educational Resources**

15. **Spring Boot Tutorial**  
    https://www.baeldung.com/spring-boot

16. **React + TypeScript Guide**  
    https://react-typescript-cheatsheet.netlify.app/

17. **RESTful API Design**  
    https://restfulapi.net/

18. **JWT Authentication Best Practices**  
    https://cheatsheetseries.owasp.org/cheatsheets/JSON_Web_Token_for_Java_Cheat_Sheet.html

### **Tools Used**

19. **Visual Studio Code**  
    https://code.visualstudio.com/

20. **Postman** (API Testing)  
    https://www.postman.com/

21. **Git** (Version Control)  
    https://git-scm.com/

22. **Maven** (Build Tool)  
    https://maven.apache.org/

23. **pnpm** (Package Manager)  
    https://pnpm.io/

### **Academic Resources**

24. **University of Lay Adventists of Kigali (UNILAK)**  
    Module: MSIT6120 – Advanced Programming Concepts and Emerging Technologies

---

## **Appendix**

### **A. Installation Guide**

See `README.md` for detailed installation instructions.

### **B. API Documentation**

All API endpoints are documented in the README.md file with request/response examples.

### **C. User Manual**

**Login:**
1. Navigate to http://localhost:5173
2. Enter credentials
3. Click Login

**Managing Medicines:**
1. Click "Medicines" in sidebar
2. Click "Add Medicine" button
3. Fill in the form
4. Click "Create"

**Managing Equipment:**
1. Click "Equipment" in sidebar
2. Use the same CRUD pattern as medicines

**Viewing Dashboard:**
1. Login to the system
2. Dashboard is the default home page
3. View statistics and alerts

### **D. Test Credentials**

| Username   | Password  | Role        |
|------------|-----------|-------------|
| admin      | admin123  | ADMIN       |
| pharmacist | pharm123  | PHARMACIST  |
| technician | tech123  | TECHNICIAN  |

### **E. Database Schema**

See System Design section for complete ERD.

### **F. Technology Stack Summary**

| Component | Technology | Version |
|-----------|------------|---------|
| Backend Framework | Spring Boot | 3.2.0 |
| Frontend Framework | React | 19.1.1 |
| Language (Frontend) | TypeScript | 5.9.3 |
| Build Tool (Backend) | Maven | 3.x |
| Build Tool (Frontend) | Vite | 7.1.7 |
| Database | SQLite | 3.x |
| UI Library | shadcn/ui | Latest |
| CSS Framework | Tailwind CSS | 4.1.15 |
| HTTP Client | Axios | 1.12.2 |
| Icons | Lucide React | 0.546.0 |
| Authentication | JWT | 0.11.5 |

---

**End of Report**

*This project was developed as part of the MSIT6120 module at the University of Lay Adventists of Kigali (UNILAK), demonstrating advanced programming concepts and emerging technologies in full-stack web development.*
