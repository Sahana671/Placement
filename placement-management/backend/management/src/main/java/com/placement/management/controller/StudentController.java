package com.placement.management.controller;

import com.placement.management.entity.Student;
import com.placement.management.service.StudentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/students")
public class StudentController {

    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @PostMapping
    public ResponseEntity<Student> register(@RequestBody Student student) {
        return ResponseEntity.ok(studentService.registerStudent(student));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Student> getProfile(@PathVariable Long id) {
        return studentService.getStudentById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<Student>> getAll() {
        return ResponseEntity.ok(studentService.getAllStudents());
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Student> updateStatus(@PathVariable Long id, @RequestBody Map<String, String> payload) {
        String status = payload.get("status");
        return ResponseEntity.ok(studentService.updatePlacementStatus(id, status));
    }

    @GetMapping("/eligible")
    public ResponseEntity<List<Student>> getEligible(@RequestParam double minCgpa) {
        return ResponseEntity.ok(studentService.getEligibleStudents(minCgpa));
    }
}