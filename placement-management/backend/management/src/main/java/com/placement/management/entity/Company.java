package com.placement.management.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "companies")
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String role;

    @Column(nullable = false)
    private double minCgpa;

    @Column(nullable = false)
    private double packageLPA;

    public Company() {}

    public Company(String name, String role, double minCgpa, double packageLPA) {
        this.name = name;
        this.role = role;
        this.minCgpa = minCgpa;
        this.packageLPA = packageLPA;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public double getMinCgpa() { return minCgpa; }
    public void setMinCgpa(double minCgpa) { this.minCgpa = minCgpa; }

    public double getPackageLPA() { return packageLPA; }
    public void setPackageLPA(double packageLPA) { this.packageLPA = packageLPA; }
}