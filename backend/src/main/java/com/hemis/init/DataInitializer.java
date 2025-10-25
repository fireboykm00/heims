package com.hemis.init;

import com.hemis.entity.*;
import com.hemis.repository.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class DataInitializer implements CommandLineRunner {
    
    private static final Logger logger = LoggerFactory.getLogger(DataInitializer.class);
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private SupplierRepository supplierRepository;
    
    @Autowired
    private MedicineRepository medicineRepository;
    
    @Autowired
    private EquipmentRepository equipmentRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Override
    public void run(String... args) {
        initializeUsers();
        initializeSuppliers();
        initializeMedicines();
        initializeEquipment();
    }
    
    private void initializeUsers() {
        if (userRepository.count() == 0) {
            User admin = new User();
            admin.setUsername("admin");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setFullName("System Administrator");
            admin.setEmail("admin@hemis.com");
            admin.setRole(User.UserRole.ADMIN);
            userRepository.save(admin);
            
            User pharmacist = new User();
            pharmacist.setUsername("pharmacist");
            pharmacist.setPassword(passwordEncoder.encode("pharm123"));
            pharmacist.setFullName("John Pharmacist");
            pharmacist.setEmail("pharmacist@hemis.com");
            pharmacist.setRole(User.UserRole.PHARMACIST);
            userRepository.save(pharmacist);
            
            User technician = new User();
            technician.setUsername("technician");
            technician.setPassword(passwordEncoder.encode("tech123"));
            technician.setFullName("Jane Technician");
            technician.setEmail("technician@hemis.com");
            technician.setRole(User.UserRole.TECHNICIAN);
            userRepository.save(technician);
            
            logger.info("Initialized default users");
        }
    }
    
    private void initializeSuppliers() {
        if (supplierRepository.count() == 0) {
            Supplier supplier1 = new Supplier();
            supplier1.setName("MediPharma Ltd");
            supplier1.setContactPerson("Robert Smith");
            supplier1.setEmail("contact@medipharma.com");
            supplier1.setPhone("+250788123456");
            supplier1.setAddress("KG 11 Ave, Kigali");
            supplierRepository.save(supplier1);
            
            Supplier supplier2 = new Supplier();
            supplier2.setName("HealthEquip Solutions");
            supplier2.setContactPerson("Sarah Johnson");
            supplier2.setEmail("info@healthequip.com");
            supplier2.setPhone("+250788234567");
            supplier2.setAddress("KN 5 Rd, Kigali");
            supplierRepository.save(supplier2);
            
            logger.info("Initialized suppliers");
        }
    }
    
    private void initializeMedicines() {
        if (medicineRepository.count() == 0) {
            Supplier supplier = supplierRepository.findAll().get(0);
            
            Medicine med1 = new Medicine();
            med1.setName("Paracetamol 500mg");
            med1.setDescription("Pain relief and fever reducer");
            med1.setCategory("Analgesics");
            med1.setQuantity(500);
            med1.setUnitPrice(0.50);
            med1.setExpiryDate(LocalDate.now().plusMonths(18));
            med1.setBatchNumber("PAR-2024-001");
            med1.setSupplier(supplier);
            medicineRepository.save(med1);
            
            Medicine med2 = new Medicine();
            med2.setName("Amoxicillin 250mg");
            med2.setDescription("Antibiotic");
            med2.setCategory("Antibiotics");
            med2.setQuantity(300);
            med2.setUnitPrice(1.20);
            med2.setExpiryDate(LocalDate.now().plusMonths(12));
            med2.setBatchNumber("AMX-2024-002");
            med2.setSupplier(supplier);
            medicineRepository.save(med2);
            
            Medicine med3 = new Medicine();
            med3.setName("Insulin 100IU/ml");
            med3.setDescription("Diabetes management");
            med3.setCategory("Diabetes");
            med3.setQuantity(45);
            med3.setUnitPrice(15.00);
            med3.setExpiryDate(LocalDate.now().plusDays(20));
            med3.setBatchNumber("INS-2024-003");
            med3.setSupplier(supplier);
            medicineRepository.save(med3);
            
            logger.info("Initialized medicines");
        }
    }
    
    private void initializeEquipment() {
        if (equipmentRepository.count() == 0) {
            Supplier supplier = supplierRepository.findAll().get(1);
            
            Equipment eq1 = new Equipment();
            eq1.setName("X-Ray Machine");
            eq1.setDescription("Digital X-Ray imaging system");
            eq1.setCategory("Imaging");
            eq1.setSerialNumber("XR-2023-0015");
            eq1.setModel("Siemens Luminos dRF");
            eq1.setSupplier(supplier);
            eq1.setPurchaseDate(LocalDate.now().minusYears(2));
            eq1.setPurchasePrice(85000.00);
            eq1.setStatus(Equipment.EquipmentStatus.OPERATIONAL);
            eq1.setNextMaintenanceDate(LocalDate.now().plusMonths(2));
            eq1.setLocation("Radiology Department");
            equipmentRepository.save(eq1);
            
            Equipment eq2 = new Equipment();
            eq2.setName("Ultrasound Scanner");
            eq2.setDescription("Portable ultrasound device");
            eq2.setCategory("Imaging");
            eq2.setSerialNumber("US-2024-0032");
            eq2.setModel("GE LOGIQ P9");
            eq2.setSupplier(supplier);
            eq2.setPurchaseDate(LocalDate.now().minusMonths(6));
            eq2.setPurchasePrice(45000.00);
            eq2.setStatus(Equipment.EquipmentStatus.OPERATIONAL);
            eq2.setNextMaintenanceDate(LocalDate.now().plusMonths(4));
            eq2.setLocation("OB/GYN Department");
            equipmentRepository.save(eq2);
            
            Equipment eq3 = new Equipment();
            eq3.setName("Patient Monitor");
            eq3.setDescription("Vital signs monitoring");
            eq3.setCategory("Monitoring");
            eq3.setSerialNumber("PM-2024-0128");
            eq3.setModel("Philips IntelliVue MX40");
            eq3.setSupplier(supplier);
            eq3.setPurchaseDate(LocalDate.now().minusMonths(3));
            eq3.setPurchasePrice(8500.00);
            eq3.setStatus(Equipment.EquipmentStatus.MAINTENANCE);
            eq3.setNextMaintenanceDate(LocalDate.now().plusDays(5));
            eq3.setLocation("ICU");
            equipmentRepository.save(eq3);
            
            logger.info("Initialized equipment");
        }
    }
}
