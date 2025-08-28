package com.sena.urbantracker.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
public class CorsConfig {
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();

        // Habilita el origen del frontend
        // Para desarrollo: incluir múltiples puertos y herramientas
        config.setAllowedOrigins(Arrays.asList(
                "http://localhost:8081", // frontend original
                "http://localhost:8085", // El puerto donde corre el API
                "http://localhost:3000", // React típico
                "null" // Para herramientas como IntelliJ IDEA, Postman, cURL
        ));
        config.setAllowedMethods(Arrays.asList("GET", "POST", "DELETE"));
        config.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type"));
        config.setAllowCredentials(true); // Importante si se está usando cookies o Authorization header

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}
