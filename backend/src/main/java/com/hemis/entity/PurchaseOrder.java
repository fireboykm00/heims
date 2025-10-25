package com.hemis.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "purchase_orders")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PurchaseOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderId;

    @Column(unique = true, nullable = false)
    private String orderNumber;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "supplier_id", nullable = false)
    private Supplier supplier;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User orderedBy;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ItemType itemType;

    private String itemName;

    @Min(value = 1, message = "Quantity must be at least 1")
    private Integer quantity;

    @Min(value = 0, message = "Unit price must be non-negative")
    private Double unitPrice;

    private Double totalAmount;

    @NotNull(message = "Order date is required")
    @Column(nullable = false)
    private LocalDate orderDate;

    private LocalDate deliveryDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private OrderStatus status = OrderStatus.PENDING;

    private String notes;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    private LocalDateTime updatedAt;

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
        if (quantity != null && unitPrice != null) {
            totalAmount = quantity * unitPrice;
        }
    }

    @PrePersist
    protected void onCreate() {
        if (quantity != null && unitPrice != null) {
            totalAmount = quantity * unitPrice;
        }
    }

    public enum ItemType {
        MEDICINE, EQUIPMENT, SUPPLIES
    }

    public enum OrderStatus {
        PENDING, APPROVED, ORDERED, DELIVERED, CANCELLED
    }
}
