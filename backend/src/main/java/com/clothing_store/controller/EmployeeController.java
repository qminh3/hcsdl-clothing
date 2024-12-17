package com.clothing_store.controller;

import com.clothing_store.dto.request.insert.EmployeeRequest;
import com.clothing_store.dto.request.update.EmployeeUpdateRequest;
import com.clothing_store.entity.user.Employee;
import com.clothing_store.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/employees")
public class EmployeeController {
    @Autowired
    private EmployeeService employeeService;

    @PostMapping
    @CrossOrigin
    ResponseEntity<String> createEmployee(@RequestBody EmployeeRequest request) {
        employeeService.createEmployee(request);
        return ResponseEntity.status(HttpStatus.OK).body("Employee updated successfully!");
    }

    @GetMapping
    @CrossOrigin
    ResponseEntity<List<Employee>> getEmployees() {
        List<Employee> employees =  employeeService.getEmployees();
        return ResponseEntity.status(HttpStatus.OK).body(employees);
    }

    @GetMapping("/{employeeID}")
    @CrossOrigin
    ResponseEntity<Employee> getEmployee(@PathVariable("employeeID") String employeeID) {
        Employee employee = employeeService.getEmployee(employeeID);
        return ResponseEntity.status(HttpStatus.OK).body(employee);
    }

    @PutMapping("/{employeeID}")
    @CrossOrigin
    ResponseEntity<String> updateEmployee(@PathVariable String employeeID, @RequestBody EmployeeUpdateRequest request) {
        employeeService.updateEmployee(employeeID, request);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body("Employee updated successfully!");
    }

    @DeleteMapping("/{employeeID}")
    @CrossOrigin
    ResponseEntity<String> deleteEmployee(@PathVariable String employeeID) {
        employeeService.deleteEmployee(employeeID);
        return ResponseEntity.status(HttpStatus.OK).body("Employee deleted successfully!");
    }
}
