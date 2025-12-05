// src/main/java/com/taller/mecanica/config/CorsConfig.java

package com.taller.mecanica.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                // Permite peticiones desde el puerto de desarrollo estándar de React/Vite
                registry.addMapping("/**") // Aplica esta configuración a todas las rutas de la API
                        .allowedOrigins("http://localhost:5173", "http://127.0.0.1:5173") // 🚨 Cambia si usas otro puerto
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Permite todos los métodos
                        .allowedHeaders("*") // Permite todos los headers
                        .allowCredentials(true); // Permite el uso de cookies/autenticación si es necesario
            }
        };
    }
}