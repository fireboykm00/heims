package com.hemis.repository;

import com.hemis.entity.Equipment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface EquipmentRepository extends JpaRepository<Equipment, Long> {
    List<Equipment> findByActiveTrue();
    List<Equipment> findByStatus(Equipment.EquipmentStatus status);
    List<Equipment> findByCategory(String category);
    List<Equipment> findByNameContainingIgnoreCase(String name);
    
    @Query("SELECT e FROM Equipment e WHERE e.nextMaintenanceDate < :date AND e.active = true")
    List<Equipment> findMaintenanceDue(LocalDate date);
}
