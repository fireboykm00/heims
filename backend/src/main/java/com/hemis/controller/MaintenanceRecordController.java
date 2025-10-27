package com.hemis.controller;

import com.hemis.entity.MaintenanceRecord;
import com.hemis.repository.MaintenanceRecordRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/maintenance")
public class MaintenanceRecordController {
    
    @Autowired
    private MaintenanceRecordRepository maintenanceRecordRepository;
    
    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'TECHNICIAN')")
    public ResponseEntity<List<MaintenanceRecord>> getAllRecords() {
        return ResponseEntity.ok(maintenanceRecordRepository.findAll());
    }
    
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'TECHNICIAN')")
    public ResponseEntity<MaintenanceRecord> getRecordById(@PathVariable Long id) {
        return maintenanceRecordRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/equipment/{equipmentId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'TECHNICIAN')")
    public ResponseEntity<List<MaintenanceRecord>> getRecordsByEquipment(@PathVariable Long equipmentId) {
        return ResponseEntity.ok(maintenanceRecordRepository.findByEquipment_EquipmentId(equipmentId));
    }
    
    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'TECHNICIAN')")
    public ResponseEntity<MaintenanceRecord> createRecord(@Valid @RequestBody MaintenanceRecord record) {
        MaintenanceRecord saved = maintenanceRecordRepository.save(record);
        return ResponseEntity.ok(saved);
    }
    
    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'TECHNICIAN')")
    public ResponseEntity<MaintenanceRecord> updateRecord(@PathVariable Long id, @Valid @RequestBody MaintenanceRecord record) {
        if (!maintenanceRecordRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        record.setRecordId(id);
        MaintenanceRecord updated = maintenanceRecordRepository.save(record);
        return ResponseEntity.ok(updated);
    }
    
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteRecord(@PathVariable Long id) {
        if (!maintenanceRecordRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        maintenanceRecordRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
