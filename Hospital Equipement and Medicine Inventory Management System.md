# 🏥 Hospital Equipment and Medicine Inventory System (HEMIS)

**University of Lay Adventists of Kigali (UNILAK)**
**Faculty of Computing and Information Technology**
**Module:** MSIT6120 – Advanced Programming Concepts and Emerging Technologies

**FINAL PROJECT REPORT**
**Project Title:** Hospital Equipment and Medicine Inventory System (HEMIS)\*\*
**Submitted by:** [Your Name]
**Date:** October 2025

---

## **Abstract**

The **Hospital Equipment and Medicine Inventory System (HEMIS)** is a full-stack web-based application designed to automate the tracking of hospital assets, medical supplies, and medicines. The system enables administrators and pharmacists to manage stock levels, monitor equipment maintenance schedules, and generate reports on usage and expiry dates. Built using **Spring Boot** (backend), **React + Vite + shadcn/ui** (frontend), and **SQLite** (database), this project demonstrates a modern, efficient approach to hospital inventory management.

---

## **Introduction**

Hospitals depend on the availability and proper management of medical supplies and equipment. Manual tracking of medicines and assets is prone to human error, which can result in shortages, expired drugs, or untracked maintenance.

The **HEMIS** provides a centralized digital solution that automates the inventory lifecycle — from procurement and stock tracking to consumption and reporting. It improves coordination between pharmacy staff, hospital administrators, and maintenance teams, ensuring accurate and real-time visibility into available resources.

---

## **Objectives**

- To automate inventory tracking of medicines, equipment, and suppliers.
- To monitor expiry dates and send alerts for near-expired stock.
- To record procurement and maintenance activities.
- To provide role-based dashboards for pharmacists and administrators.
- To generate daily, weekly, or monthly reports on stock usage.

---

## **System Description**

HEMIS is designed as a **three-tier application** that includes:

1. **Backend:**

   - Developed using **Spring Boot** and **Spring Data JPA**.
   - Provides RESTful APIs for CRUD operations on medicines, equipment, and suppliers.
   - Handles authentication and authorization with **JWT**.

2. **Frontend:**

   - Built using **React + Vite**, styled with **Tailwind CSS** and **shadcn/ui**.
   - Provides interactive dashboards, stock tables, and report views.
   - Communicates with backend via **Axios**.

3. **Database:**

   - Uses **SQLite** for lightweight, file-based persistence.
   - Hibernate auto-generates schema from entity models.

**User Roles:**

- **Admin:** Manage users, suppliers, and reports.
- **Pharmacist:** Manage medicine stock and expiry.
- **Technician:** Update maintenance records for equipment.

---

## **System Design**

### **Entity Relationship Diagram (ERD)**

Entities and Relationships:

| Entity                | Description                                 |
| --------------------- | ------------------------------------------- |
| **User**              | Stores user credentials and roles           |
| **Supplier**          | Vendor or source for medical items          |
| **Medicine**          | Contains stock info, expiry dates, quantity |
| **Equipment**         | Tracks assets and maintenance schedules     |
| **PurchaseOrder**     | Records purchases of items                  |
| **MaintenanceRecord** | Logs maintenance activity for equipment     |

**Relationships:**

- Supplier → Medicine / Equipment: **1–N**
- Equipment → MaintenanceRecord: **1–N**
- User → PurchaseOrder: **1–N**

🧩 _ERD generated via dbdiagram.io (see attached Figure 1)_

---

### **System Architecture Diagram**

**Frontend (React + Vite)**
⬇
**Backend (Spring Boot REST API)**
⬇
**Database (SQLite)**

All communication happens through HTTP/JSON requests handled by Axios.

🧩 _Architecture diagram designed in draw.io (see Figure 2)._

---

## **Implementation**

### **Backend (Spring Boot)**

- REST APIs: `/api/medicines`, `/api/equipment`, `/api/suppliers`, `/api/orders`.
- Authentication: JWT-based login endpoint `/api/auth/login`.
- ORM: Spring Data JPA using SQLite database.
- Validation: Implemented via `@NotNull`, `@Email`, and `@Min`.
- Scheduler: Background job using `@Scheduled` to check for expired medicines daily.

**Key Dependencies (pom.xml):**

```xml
spring-boot-starter-web
spring-boot-starter-data-jpa
spring-boot-starter-security
org.xerial:sqlite-jdbc
jjwt-api
lombok
```

---

### **Frontend (React + Vite + shadcn/ui)**

- Pages:

  - `Login.jsx` — Secure access.
  - `Dashboard.jsx` — Summary of stock, expiry alerts, and reports.
  - `Medicines.jsx` — CRUD for medicine records.
  - `Equipment.jsx` — Manage equipment and maintenance logs.
  - `Suppliers.jsx` — Manage suppliers.

- Uses `Axios` for API calls and `localStorage` for JWT tokens.
- UI built with **shadcn/ui** components:

  - `Card`, `Button`, `Table`, `Input`, `Dialog`, `Tabs`.

---

### **Database (SQLite)**

**Tables:**

- `users`
- `suppliers`
- `medicines`
- `equipment`
- `purchase_orders`
- `maintenance_records`

**DDL Example (auto-generated via JPA):**

```sql
CREATE TABLE medicine (
  medicine_id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  quantity INTEGER,
  expiry_date TEXT,
  supplier_id INTEGER,
  FOREIGN KEY (supplier_id) REFERENCES supplier(supplier_id)
);
```

---

## **Testing**

- **Backend:** Tested APIs using Postman for all CRUD endpoints.
- **Frontend:** Manual browser tests for UI interaction.
- **Integration:** Verified synchronization between React and backend API data.

Screenshots include:

- Spring Boot running (`localhost:8080`)
- Postman API tests
- React dashboard displaying alerts and tables

---

## **Challenges and Solutions**

| Challenge                    | Solution                                   |
| ---------------------------- | ------------------------------------------ |
| JWT token expired frequently | Implemented token refresh endpoint         |
| SQLite concurrency errors    | Enabled synchronized transactions          |
| React form state issues      | Used controlled components with `useState` |
| Styling inconsistency        | Adopted shadcn/ui for uniform look         |

---

## **Conclusion and Recommendations**

The **Hospital Equipment and Medicine Inventory System** demonstrates how a lightweight, modern web app can effectively manage hospital resources. It successfully integrates real-time tracking, reporting, and authentication.

**Future Enhancements:**

- Integrate barcode scanning for item updates.
- Add automated purchase order generation based on low stock.
- Develop a companion mobile app for on-site use.

---
