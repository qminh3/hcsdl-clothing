package com.clothing_store.repository;

import com.clothing_store.entity.user.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, String> {
    @Procedure(procedureName = "InsertEmployee")
    void insertEmployee(@Param("p_employee_id") String userId,
                        @Param("p_position") String registrationDate,
                        @Param("p_salary") BigDecimal salary,
                        @Param("p_supervisor_id") String supervisorId);

    @Procedure(procedureName = "UpdateEmployee")
    void updateEmployee(
            @Param("p_employee_id") String userId,
            @Param("p_position") String position,
            @Param("p_salary") BigDecimal salary
    );

    @Procedure(procedureName = "DeleteEmployee")
    void deleteEmployee(@Param("p_employee_id") String userId);

    @Procedure(procedureName = "GetEmployeeById")
    Employee getEmployeeById(@Param("p_employee_id") String employeeId);

    @Procedure(procedureName = "GetAllEmployees")
    List<Employee> getAllEmployees();
}
