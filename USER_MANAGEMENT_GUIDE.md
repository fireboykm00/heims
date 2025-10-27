# User Management Feature

## Overview

Admins can now create and manage all system users (Admins, Pharmacists, and Technicians) through a dedicated User Management interface.

---

## 🔐 Access Control

**Who can access**: **ADMIN users only**

- Pharmacists and Technicians **cannot** see or access the Users menu
- Backend endpoints are protected with `@PreAuthorize("hasRole('ADMIN')")`

---

## ✨ Features

### 1. View All Users
- See complete list of all system users
- View username, full name, email, role, and status
- Role badges with color coding:
  - 🔴 **ADMIN** - Red
  - 🟢 **PHARMACIST** - Green
  - 🔵 **TECHNICIAN** - Blue

### 2. Create New Users
- Add admins, pharmacists, or technicians
- Required fields:
  - Username (must be unique)
  - Password (auto-hashed with BCrypt)
  - Full Name
  - Role
- Optional fields:
  - Email (must be unique if provided)
- Set active status on creation

### 3. Edit Existing Users
- Update username, full name, email, and role
- Change password (leave blank to keep existing)
- Toggle active status
- Prevents duplicate usernames and emails

### 4. Activate/Deactivate Users
- Quick toggle button to activate or deactivate users
- Active users: 🟢 Green checkmark
- Inactive users: 🔴 Red X
- Inactive users cannot log in

### 5. Delete Users (Soft Delete)
- Deactivates user instead of permanently deleting
- Cannot delete yourself (prevents admin lockout)
- User data preserved for audit purposes

---

## 📍 How to Access

1. **Login as Admin**
   - Username: `admin`
   - Password: `admin123`

2. **Navigate to Users**
   - Look for "Users" in the sidebar navigation
   - Only visible to ADMIN users

3. **Manage Users**
   - Click "+ Add User" to create new users
   - Click edit button (pencil icon) to modify
   - Click toggle button to activate/deactivate
   - Click delete button (trash icon) to deactivate

---

## 🛡️ Security Features

### Password Security
- Passwords are hashed using **BCrypt** before storage
- Passwords are **never** returned in API responses
- When editing, leave password blank to keep existing
- Strong password hashing prevents rainbow table attacks

### Username & Email Validation
- Usernames must be unique across the system
- Email addresses must be unique (if provided)
- Backend validates on both create and update
- Prevents duplicate account creation

### Access Control
- All endpoints require ADMIN role
- Frontend hides menu for non-admins
- Backend rejects unauthorized requests with 403
- Double-layer security (UI + API)

### Self-Protection
- Admins cannot delete themselves
- Prevents accidental system lockout
- Must use another admin to modify admin accounts

---

## 🔄 User Lifecycle

### Creating a User
```
1. Admin clicks "+ Add User"
2. Fills out form (username, password, full name, role)
3. Optionally adds email
4. Sets active status (default: true)
5. Submits form
6. Password is hashed automatically
7. User is created and can login immediately
```

### Editing a User
```
1. Admin clicks edit button (pencil icon)
2. Modifies fields as needed
3. Can change role (e.g., PHARMACIST → ADMIN)
4. Password field empty = keep existing password
5. Password field filled = set new password
6. Submits form
7. Changes take effect immediately
```

### Deactivating a User
```
1. Admin clicks toggle button OR delete button
2. User status set to inactive
3. User can no longer log in
4. Data is preserved
5. Can be reactivated later
```

---

## 📊 User Management Table

| Column | Description |
|--------|-------------|
| **Username** | Unique login identifier |
| **Full Name** | User's display name |
| **Email** | Contact email (optional) |
| **Role** | ADMIN / PHARMACIST / TECHNICIAN |
| **Status** | Active (green) or Inactive (red) |
| **Actions** | Edit, Toggle Active, Delete buttons |

---

## 🎯 Use Cases

### Adding a New Pharmacist
```
1. Login as admin
2. Navigate to Users
3. Click "+ Add User"
4. Username: johndoe
5. Password: (secure password)
6. Full Name: John Doe
7. Email: john.doe@hospital.com
8. Role: PHARMACIST
9. Active: ✓
10. Click "Create"
```

### Promoting a User
```
1. Find user in table
2. Click edit button
3. Change Role: PHARMACIST → ADMIN
4. Click "Update"
5. User now has admin privileges
```

### Temporarily Disabling Access
```
1. Find user in table
2. Click toggle button (user icon)
3. Status changes to Inactive
4. User cannot log in
5. Click again to reactivate
```

---

## 🔧 Technical Implementation

### Backend
```java
@RestController
@RequestMapping("/api/users")
@PreAuthorize("hasRole('ADMIN')")
public class UserController {
    // CRUD operations
    // Password hashing with BCrypt
    // Duplicate validation
}
```

### Frontend
```typescript
// Only shown to ADMIN in navigation
{ name: 'Users', href: '/dashboard/users', icon: Users, roles: ['ADMIN'] }

// UsersPage component
- Full CRUD interface
- Form validation
- Error handling
- Status indicators
```

---

## ⚠️ Important Notes

1. **Cannot Delete Yourself**
   - The current admin cannot delete their own account
   - Prevents accidental system lockout
   - Use another admin account if needed

2. **Password Changes**
   - When editing, empty password = no change
   - New password is immediately hashed and active
   - Old password cannot be recovered

3. **Default Users**
   - System comes with 3 default users
   - Do not delete default admin unless you have another
   - Default passwords should be changed in production

4. **Email is Optional**
   - Email field is not required
   - If provided, must be unique
   - Can be used for future features (password reset, notifications)

5. **Soft Delete**
   - Delete button deactivates, not removes
   - Data preserved for audit trails
   - Can be reactivated anytime

---

## 📝 API Endpoints

All endpoints require `ADMIN` role:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users` | List all users |
| GET | `/api/users/{id}` | Get user by ID |
| POST | `/api/users` | Create new user |
| PUT | `/api/users/{id}` | Update user |
| DELETE | `/api/users/{id}` | Deactivate user |
| PATCH | `/api/users/{id}/toggle-active` | Toggle active status |

---

## ✅ Checklist for Admins

### Before Creating Users
- [ ] Determine appropriate role for user
- [ ] Prepare strong password
- [ ] Have user's full name
- [ ] Optionally have user's email

### After Creating Users
- [ ] Verify user appears in table
- [ ] Confirm role badge is correct
- [ ] Test user can login
- [ ] Verify user sees appropriate menu items

### User Management Best Practices
- [ ] Use descriptive usernames
- [ ] Enforce strong passwords
- [ ] Keep emails updated
- [ ] Regularly review user list
- [ ] Deactivate users who leave
- [ ] Don't share admin credentials
- [ ] Maintain at least 2 active admins

---

## 🎉 Benefits

1. **Centralized Management**: All user administration in one place
2. **Security**: Proper password hashing and access control
3. **Flexibility**: Easy to add, modify, or remove users
4. **Audit Trail**: Soft delete preserves history
5. **Self-Service**: Admins don't need database access
6. **Role Management**: Quick role changes for promotions
7. **Status Control**: Easy activate/deactivate for temporary access

---

## 🚀 Future Enhancements (Optional)

- [ ] Password reset via email
- [ ] Force password change on first login
- [ ] Password strength requirements
- [ ] User activity logging
- [ ] Bulk user import/export
- [ ] Two-factor authentication
- [ ] Session management (force logout)
- [ ] User groups/permissions

---

**Status**: ✅ **Fully Implemented and Ready**

Admins now have complete control over user management with a secure, user-friendly interface.
