export interface User {
  userId: number;
  username: string;
  fullName: string;
  email: string;
  role: 'ADMIN' | 'PHARMACIST' | 'TECHNICIAN';
  active: boolean;
}

export interface Supplier {
  supplierId?: number;
  name: string;
  contactPerson?: string;
  email?: string;
  phone?: string;
  address?: string;
  active?: boolean;
}

export interface Medicine {
  medicineId?: number;
  name: string;
  description?: string;
  category: string;
  quantity: number;
  unitPrice?: number;
  expiryDate: string;
  batchNumber?: string;
  supplier?: Supplier;
  active?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Equipment {
  equipmentId?: number;
  name: string;
  description?: string;
  category: string;
  serialNumber?: string;
  model?: string;
  supplier?: Supplier;
  purchaseDate?: string;
  purchasePrice?: number;
  status: 'OPERATIONAL' | 'MAINTENANCE' | 'OUT_OF_ORDER' | 'RETIRED';
  nextMaintenanceDate?: string;
  location?: string;
  active?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface PurchaseOrder {
  orderId?: number;
  orderNumber?: string;
  supplier: Supplier;
  orderedBy?: User;
  itemType: 'MEDICINE' | 'EQUIPMENT' | 'SUPPLIES';
  itemName?: string;
  quantity?: number;
  unitPrice?: number;
  totalAmount?: number;
  orderDate: string;
  deliveryDate?: string;
  status: 'PENDING' | 'APPROVED' | 'ORDERED' | 'DELIVERED' | 'CANCELLED';
  notes?: string;
}

export interface MaintenanceRecord {
  recordId?: number;
  equipment: Equipment;
  technician?: User;
  maintenanceDate: string;
  type: 'ROUTINE' | 'REPAIR' | 'CALIBRATION' | 'INSPECTION' | 'EMERGENCY';
  description?: string;
  cost?: number;
  performedBy?: string;
  nextScheduledDate?: string;
  status: 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
}

export interface DashboardStats {
  totalMedicines: number;
  totalEquipment: number;
  totalSuppliers: number;
  lowStockMedicines: number;
  expiringMedicines: number;
  equipmentNeedingMaintenance: number;
  pendingOrders: number;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  username: string;
  role: string;
  fullName: string;
}
