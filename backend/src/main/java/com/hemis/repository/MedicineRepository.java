package com.hemis.repository;

import com.hemis.entity.Medicine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface MedicineRepository extends JpaRepository<Medicine, Long> {
    List<Medicine> findByActiveTrue();
    List<Medicine> findByCategory(String category);
    List<Medicine> findByNameContainingIgnoreCase(String name);
    List<Medicine> findByQuantityLessThan(Integer quantity);
    
    @Query("SELECT m FROM Medicine m WHERE m.expiryDate BETWEEN :startDate AND :endDate AND m.active = true")
    List<Medicine> findExpiringBetween(LocalDate startDate, LocalDate endDate);
    
    @Query("SELECT m FROM Medicine m WHERE m.expiryDate < :date AND m.active = true")
    List<Medicine> findExpired(LocalDate date);
}
