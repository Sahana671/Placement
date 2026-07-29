package com.placement.management.service;

import com.placement.management.entity.Company;
import com.placement.management.repository.CompanyRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CompanyService {

    private final CompanyRepository companyRepository;

    public CompanyService(CompanyRepository companyRepository) {
        this.companyRepository = companyRepository;
    }

    public Company registerCompany(Company company) {
        return companyRepository.save(company);
    }

    public List<Company> getAllCompanies() {
        return companyRepository.findAll();
    }
}