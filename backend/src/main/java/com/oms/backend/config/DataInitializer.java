package com.oms.backend.config;

import com.oms.backend.models.User;
import com.oms.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder encoder;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {
            userRepository.save(new User("Platform Admin", "admin@medical.com", encoder.encode("admin123"), "admin"));
            userRepository.save(new User("Dr. Maya Patel", "doctor@medical.com", encoder.encode("doctor123"), "doctor"));
            userRepository.save(new User("Alice Brown", "patient@medical.com", encoder.encode("patient123"), "patient"));
            userRepository.save(new User("Pharm. Lena Kim", "pharmacist@medical.com", encoder.encode("pharmacist123"), "pharmacist"));
            
            // From constants
            userRepository.save(new User("Dr. Maya Patel", "maya.patel@medical.com", encoder.encode("maya123"), "doctor"));
            userRepository.save(new User("Alice Brown", "alice.brown@medical.com", encoder.encode("alice123"), "patient"));
        }
    }
}
