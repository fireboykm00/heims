import axiosInstance from "@/lib/axios";
import type {
  Medicine,
  Equipment,
  Supplier,
  PurchaseOrder,
  MaintenanceRecord,
  DashboardStats,
} from "@/types";

export const api = {
  // Dashboard
  getDashboardStats: () =>
    axiosInstance.get<DashboardStats>("/api/dashboard/stats"),

  // Medicines
  getMedicines: () => axiosInstance.get<Medicine[]>("/api/medicines"),
  getMedicine: (id: number) =>
    axiosInstance.get<Medicine>(`/api/medicines/${id}`),
  createMedicine: (data: Medicine) =>
    axiosInstance.post<Medicine>("/api/medicines", data),
  updateMedicine: (id: number, data: Medicine) =>
    axiosInstance.put<Medicine>(`/api/medicines/${id}`, data),
  deleteMedicine: (id: number) => axiosInstance.delete(`/api/medicines/${id}`),
  getLowStockMedicines: (threshold = 50) =>
    axiosInstance.get<Medicine[]>(
      `/api/medicines/low-stock?threshold=${threshold}`
    ),
  getExpiringMedicines: (days = 30) =>
    axiosInstance.get<Medicine[]>(`/api/medicines/expiring?days=${days}`),

  // Equipment
  getEquipment: () => axiosInstance.get<Equipment[]>("/api/equipment"),
  getEquipmentById: (id: number) =>
    axiosInstance.get<Equipment>(`/api/equipment/${id}`),
  createEquipment: (data: Equipment) =>
    axiosInstance.post<Equipment>("/api/equipment", data),
  updateEquipment: (id: number, data: Equipment) =>
    axiosInstance.put<Equipment>(`/api/equipment/${id}`, data),
  deleteEquipment: (id: number) => axiosInstance.delete(`/api/equipment/${id}`),
  getMaintenanceDue: (days = 30) =>
    axiosInstance.get<Equipment[]>(
      `/api/equipment/maintenance-due?days=${days}`
    ),

  // Suppliers
  getSuppliers: () => axiosInstance.get<Supplier[]>("/api/suppliers"),
  getSupplier: (id: number) =>
    axiosInstance.get<Supplier>(`/api/suppliers/${id}`),
  createSupplier: (data: Supplier) =>
    axiosInstance.post<Supplier>("/api/suppliers", data),
  updateSupplier: (id: number, data: Supplier) =>
    axiosInstance.put<Supplier>(`/api/suppliers/${id}`, data),
  deleteSupplier: (id: number) => axiosInstance.delete(`/api/suppliers/${id}`),

  // Purchase Orders
  getOrders: () => axiosInstance.get<PurchaseOrder[]>("/api/orders"),
  getOrder: (id: number) =>
    axiosInstance.get<PurchaseOrder>(`/api/orders/${id}`),
  createOrder: (data: PurchaseOrder) =>
    axiosInstance.post<PurchaseOrder>("/api/orders", data),
  updateOrder: (id: number, data: PurchaseOrder) =>
    axiosInstance.put<PurchaseOrder>(`/api/orders/${id}`, data),
  deleteOrder: (id: number) => axiosInstance.delete(`/api/orders/${id}`),

  // Maintenance Records
  getMaintenanceRecords: () =>
    axiosInstance.get<MaintenanceRecord[]>("/api/maintenance"),
  getMaintenanceRecord: (id: number) =>
    axiosInstance.get<MaintenanceRecord>(`/api/maintenance/${id}`),
  getEquipmentMaintenanceRecords: (equipmentId: number) =>
    axiosInstance.get<MaintenanceRecord[]>(
      `/api/maintenance/equipment/${equipmentId}`
    ),
  createMaintenanceRecord: (data: MaintenanceRecord) =>
    axiosInstance.post<MaintenanceRecord>("/api/maintenance", data),
  updateMaintenanceRecord: (id: number, data: MaintenanceRecord) =>
    axiosInstance.put<MaintenanceRecord>(`/api/maintenance/${id}`, data),
  deleteMaintenanceRecord: (id: number) =>
    axiosInstance.delete(`/api/maintenance/${id}`),

  // Users (Admin only)
  getUsers: () => axiosInstance.get<any[]>("/api/users"),
  getUser: (id: number) => axiosInstance.get<any>(`/api/users/${id}`),
  createUser: (data: any) => axiosInstance.post<any>("/api/users", data),
  updateUser: (id: number, data: any) =>
    axiosInstance.put<any>(`/api/users/${id}`, data),
  deleteUser: (id: number) => axiosInstance.delete(`/api/users/${id}`),
  toggleUserActive: (id: number) =>
    axiosInstance.patch<any>(`/api/users/${id}/toggle-active`),
};
