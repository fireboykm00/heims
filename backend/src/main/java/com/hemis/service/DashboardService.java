package com.hemis.service;

import com.hemis.dto.DashboardStats;
import com.hemis.entity.Equipment;
import com.hemis.entity.PurchaseOrder;
import com.hemis.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class DashboardService {
    
    @Autowired
    private MedicineRepository medicineRepository;
    
    @Autowired
    private EquipmentRepository equipmentRepository;
    
    @Autowired
    private SupplierRepository supplierRepository;
    
    @Autowired
    private PurchaseOrderRepository purchaseOrderRepository;
    
    public DashboardStats getStats() {
        LocalDate today = LocalDate.now();
        LocalDate next30Days = today.plusDays(30);
        
        long totalMedicines = medicineRepository.count();
        long totalEquipment = equipmentRepository.count();
        long totalSuppliers = supplierRepository.count();
        long lowStockMedicines = medicineRepository.findByQuantityLessThan(50).size();
        long expiringMedicines = medicineRepository.findExpiringBetween(today, next30Days).size();
        long equipmentNeedingMaintenance = equipmentRepository.findMaintenanceDue(next30Days).size();
        long pendingOrders = purchaseOrderRepository.findByStatus(PurchaseOrder.OrderStatus.PENDING).size();
        
        return new DashboardStats(
            totalMedicines,
            totalEquipment,
            totalSuppliers,
            lowStockMedicines,
            expiringMedicines,
            equipmentNeedingMaintenance,
            pendingOrders
        );
    }
}
