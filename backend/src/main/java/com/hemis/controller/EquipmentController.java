package com.hemis.controller;

import com.hemis.entity.Equipment;
import com.hemis.repository.EquipmentRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/equipment")
public class EquipmentController {
    
    @Autowired
    private EquipmentRepository equipmentRepository;
    
    @GetMapping
    public ResponseEntity<List<Equipment>> getAllEquipment() {
        return ResponseEntity.ok(equipmentRepository.findByActiveTrue());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Equipment> getEquipmentById(@PathVariable Long id) {
        return equipmentRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<Equipment> createEquipment(@Valid @RequestBody Equipment equipment) {
        Equipment saved = equipmentRepository.save(equipment);
        return ResponseEntity.ok(saved);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Equipment> updateEquipment(@PathVariable Long id, @Valid @RequestBody Equipment equipment) {
        if (!equipmentRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        equipment.setEquipmentId(id);
        Equipment updated = equipmentRepository.save(equipment);
        return ResponseEntity.ok(updated);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEquipment(@PathVariable Long id) {
        return equipmentRepository.findById(id)
                .map(equipment -> {
                    equipment.setActive(false);
                    equipmentRepository.save(equipment);
                    return ResponseEntity.ok().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/maintenance-due")
    public ResponseEntity<List<Equipment>> getMaintenanceDue(@RequestParam(defaultValue = "30") Integer days) {
        LocalDate dueDate = LocalDate.now().plusDays(days);
        return ResponseEntity.ok(equipmentRepository.findMaintenanceDue(dueDate));
    }
}
