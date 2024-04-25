package com.example.demo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

// Repository interface for å utføre databaseoperasjoner for Billett-entiteter,
@Repository
public interface BillettRepository extends JpaRepository<Billett, Long> {
}
