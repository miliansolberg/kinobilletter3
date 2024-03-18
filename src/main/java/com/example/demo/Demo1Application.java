package com.example.demo;

import java.util.List;
import java.util.ArrayList;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
@RestController
public class Demo1Application {

    // Statisk liste for å lagre Billett objekter
    private static List<Billett> billetterList = new ArrayList<>();

    public static void main(String[] args) {
        SpringApplication.run(Demo1Application.class, args);
    }

    // Definer en bean som returner en WebMvcConfigurer for å konfigurere CORS
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("http://localhost:3000", "http://127.0.0.1:3000", "http://localhost:8080")
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }
        };
    }


    // Definer GetMapping for å håndtere get-forespørsler for "/billetter"
    @GetMapping("/billetter")
    public List<Billett> getBilletter() {
        // Return the list of billetter
        return billetterList;
    }

    // Definer PostMapping for å håndtere POST-forespørsler for "/billetter"
    @PostMapping("/billetter")
    public Billett createBillett(@RequestBody Billett billett) {
        // Add the billett to the list
        billetterList.add(billett);
        return billett;
    }

    public static class Billett {
        private String film;
        private int antall;
        private String fornavn;
        private String etternavn;
        private String telefon;
        private String epost;

        // No-args constructor
        public Billett() {
        }

        // All-args constructor
        public Billett(String film, int antall, String fornavn, String etternavn, String telefon, String epost) {
            this.film = film;
            this.antall = antall;
            this.fornavn = fornavn;
            this.etternavn = etternavn;
            this.telefon = telefon;
            this.epost = epost;
        }

        // Getters
        public String getFilm() {
            return film;
        }

        public int getAntall() {
            return antall;
        }

        public String getFornavn() {
            return fornavn;
        }

        public String getEtternavn() {
            return etternavn;
        }

        public String getTelefon() {
            return telefon;
        }

        public String getEpost() {
            return epost;
        }

        // Setters
        public void setFilm(String film) {
            this.film = film;
        }

        public void setAntall(int antall) {
            this.antall = antall;
        }

        public void setFornavn(String fornavn) {
            this.fornavn = fornavn;
        }

        public void setEtternavn(String etternavn) {
            this.etternavn = etternavn;
        }

        public void setTelefon(String telefon) {
            this.telefon = telefon;
        }

        public void setEpost(String epost) {
            this.epost = epost;
        }
    }
}