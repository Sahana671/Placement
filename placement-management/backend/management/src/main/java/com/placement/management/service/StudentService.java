package com.placement.management.service;

import com.placement.management.entity.Student;
import com.placement.management.repository.StudentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService {

    private final StudentRepository studentRepository;

    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    public Student registerStudent(Student student) {
        student.setStatus("Unplaced");
        return studentRepository.save(student);
    }

    public Optional<Student> getStudentById(Long id) {
        return studentRepository.findById(id);
    }

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public Student updatePlacementStatus(Long id, String status) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found with ID: " + id));
        student.setStatus(status);
        return studentRepository.save(student);
    }

    public List<Student> getEligibleStudents(double minCgpa) {
        return studentRepository.findByCgpaGreaterThanEqualAndStatus(minCgpa, "Unplaced");
    }
}