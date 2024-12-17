package com.clothing_store.service;

import com.clothing_store.dto.request.insert.EmployeeRequest;
import com.clothing_store.dto.request.update.EmployeeUpdateRequest;
import com.clothing_store.entity.user.Employee;
import com.clothing_store.repository.EmployeeRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService extends UserService{
    @Autowired
    private EmployeeRepository employeeRepository;

    @Transactional
    public void createEmployee(EmployeeRequest request) {
        String userId = userRepository.insertUser(
                request.getFirstName(),
                request.getLastName(),
                request.getPhoneNumber(),
                request.getPassword(),
                request.getEmail()
        );

        employeeRepository.insertEmployee(
                userId,
                request.getPosition(),
                request.getSalary(),
                request.getSupervisorID()
        );
    }

    @Transactional
    public void updateEmployee(String userId, EmployeeUpdateRequest request) {
        employeeRepository.updateEmployee(
                userId,
                request.getPosition(),
                request.getSalary()
        );
    }
    @Transactional
    public List<Employee> getEmployees() {return employeeRepository.getAllEmployees();}

    @Transactional
    public Employee getEmployee(String employeeID) {
        return employeeRepository.getEmployeeById(employeeID);
    }

    @Transactional
    public void deleteEmployee(String employeeID) {
        employeeRepository.deleteEmployee(employeeID);
    }
}
