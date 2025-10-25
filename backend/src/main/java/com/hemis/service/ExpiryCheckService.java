package com.hemis.service;

import com.hemis.entity.Medicine;
import com.hemis.repository.MedicineRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ExpiryCheckService {
    
    private static final Logger logger = LoggerFactory.getLogger(ExpiryCheckService.class);
    
    @Autowired
    private MedicineRepository medicineRepository;
    
    @Scheduled(cron = "0 0 8 * * ?") // Run daily at 8 AM
    public void checkExpiredMedicines() {
        LocalDate today = LocalDate.now();
        List<Medicine> expired = medicineRepository.findExpired(today);
        
        if (!expired.isEmpty()) {
            logger.warn("Found {} expired medicines", expired.size());
            for (Medicine medicine : expired) {
                logger.warn("Expired: {} (ID: {}, Expiry: {})", 
                    medicine.getName(), medicine.getMedicineId(), medicine.getExpiryDate());
            }
        }
        
        LocalDate next30Days = today.plusDays(30);
        List<Medicine> expiring = medicineRepository.findExpiringBetween(today, next30Days);
        
        if (!expiring.isEmpty()) {
            logger.info("Found {} medicines expiring in next 30 days", expiring.size());
        }
    }
}
