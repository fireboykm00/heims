package com.hemis.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "equipment")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Equipment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long equipmentId;

    @NotBlank(message = "Equipment name is required")
    @Column(nullable = false)
    private String name;

    private String description;

    @NotBlank(message = "Category is required")
    private String category;

    private String serialNumber;

    private String model;

    @ManyToOne
    @JoinColumn(name = "supplier_id")
    private Supplier supplier;

    private LocalDate purchaseDate;

    private Double purchasePrice;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EquipmentStatus status = EquipmentStatus.OPERATIONAL;

    private LocalDate nextMaintenanceDate;

    private String location;

    @Column(nullable = false)
    private Boolean active = true;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    private LocalDateTime updatedAt;

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    public enum EquipmentStatus {
        OPERATIONAL, MAINTENANCE, OUT_OF_ORDER, RETIRED
    }
}
