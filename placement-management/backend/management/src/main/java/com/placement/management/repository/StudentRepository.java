package com.placement.management.repository;

import com.placement.management.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    List<Student> findByStatus(String status);
    List<Student> findByCgpaGreaterThanEqualAndStatus(double minCgpa, String status);
}