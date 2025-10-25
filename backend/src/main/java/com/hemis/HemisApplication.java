package com.hemis;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class HemisApplication {
    public static void main(String[] args) {
        SpringApplication.run(HemisApplication.class, args);
    }
}
