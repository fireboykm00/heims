package com.hemis.repository;

import com.hemis.entity.MaintenanceRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MaintenanceRecordRepository extends JpaRepository<MaintenanceRecord, Long> {
    List<MaintenanceRecord> findByEquipment_EquipmentId(Long equipmentId);
    List<MaintenanceRecord> findByTechnician_UserId(Long userId);
    List<MaintenanceRecord> findByStatus(MaintenanceRecord.MaintenanceStatus status);
}
