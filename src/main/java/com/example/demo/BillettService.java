package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Sort;
import java.util.List;

// Service-klasse for å håndtere forretningslogikk for Billett-entiteter
@Service
public class BillettService {

    @Autowired
    private BillettRepository billettRepository;

    // Henter en liste over alle Billett-entiteter, sortert etter etternavn
    public List<Billett> getBilletter() {
        return billettRepository.findAll(Sort.by(Sort.Direction.ASC, "etternavn"));
    }

    public Billett saveBillett(Billett billett) {
        return billettRepository.save(billett);
    }

    public void deleteAllBilletter() {
        billettRepository.deleteAll();
    }
}