package com.placement.management.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "students")
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String department;

    @Column(nullable = false)
    private double cgpa;

    @Column(nullable = false)
    private String status = "Unplaced";

    public Student() {}

    public Student(String name, String department, double cgpa) {
        this.name = name;
        this.department = department;
        this.cgpa = cgpa;
        this.status = "Unplaced";
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }

    public double getCgpa() { return cgpa; }
    public void setCgpa(double cgpa) { this.cgpa = cgpa; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}