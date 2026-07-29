package com.placement.management.controller;

import com.placement.management.entity.Company;
import com.placement.management.service.CompanyService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/companies")
public class CompanyController {

    private final CompanyService companyService;

    public CompanyController(CompanyService companyService) {
        this.companyService = companyService;
    }

    @PostMapping
    public ResponseEntity<Company> addCompany(@RequestBody Company company) {
        return ResponseEntity.ok(companyService.registerCompany(company));
    }

    @GetMapping
    public ResponseEntity<List<Company>> getAll() {
        return ResponseEntity.ok(companyService.getAllCompanies());
    }
}