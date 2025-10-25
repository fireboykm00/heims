package com.hemis.repository;

import com.hemis.entity.PurchaseOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PurchaseOrderRepository extends JpaRepository<PurchaseOrder, Long> {
    List<PurchaseOrder> findByStatus(PurchaseOrder.OrderStatus status);
    List<PurchaseOrder> findBySupplier_SupplierId(Long supplierId);
    List<PurchaseOrder> findByOrderedBy_UserId(Long userId);
}
