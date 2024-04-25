package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import java.util.List;

@SpringBootApplication
@RestController
public class Demo1Application {

    // Automatisk Dependency Injection
    @Autowired
    private BillettService billettService;

    // Hovedmetoden for å starte applikasjonen
    public static void main(String[] args) {
        SpringApplication.run(Demo1Application.class, args);
    }

    // Bean for konfigurasjon av CORS
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("http://localhost:8080")
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }
        };
    }

    @GetMapping("/billetter")
    public List<Billett> getBilletter() {
        return billettService.getBilletter();
    }

    @PostMapping("/billetter")
    public Billett createBillett(@RequestBody Billett billett) {
        return billettService.saveBillett(billett);
    }

    @DeleteMapping("/billetter")
    public void deleteBilletter() {
        billettService.deleteAllBilletter();
    }
}