package com.sena.urbantracker;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.sena.urbantracker")
@EntityScan(basePackages = "com.sena.urbantracker")
public class UrbanTrackerApplication {

    public static void main(String[] args) {
        SpringApplication.run(UrbanTrackerApplication.class, args);
    }
}
