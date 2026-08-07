package io.aetherstream;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.scheduling.annotation.EnableScheduling;

/**
 * Main Entry Point for Aether Stream Enterprise Backend Microservice
 */
@SpringBootApplication
@EnableCaching
@EnableScheduling
public class AetherStreamApplication {

    public static void main(String[] args) {
        SpringApplication.run(AetherStreamApplication.class, args);
    }
}
