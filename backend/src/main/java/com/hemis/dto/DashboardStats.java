package com.hemis.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DashboardStats {
    private Long totalMedicines;
    private Long totalEquipment;
    private Long totalSuppliers;
    private Long lowStockMedicines;
    private Long expiringMedicines;
    private Long equipmentNeedingMaintenance;
    private Long pendingOrders;
}
