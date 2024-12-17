package com.clothing_store.controller;

import com.clothing_store.dto.request.insert.CustomerRequest;
import com.clothing_store.entity.user.Customer;
import com.clothing_store.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/customers")
public class CustomerController {
    @Autowired
    private CustomerService customerService;

    @PostMapping
    @CrossOrigin
    public ResponseEntity<String> createCustomer(@RequestBody CustomerRequest request) {
        try {
            // Gọi service để thêm khách hàng và người dùng
            customerService.createCustomer(request);
            return ResponseEntity.status(HttpStatus.CREATED).body("Customer created successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating customer: " + e.getMessage());
        }
    }

    @GetMapping
    @CrossOrigin
    ResponseEntity<List<Customer>> getCustomers() {
        List<Customer> customers = customerService.getCustomers();
        return ResponseEntity.status(HttpStatus.OK).body(customers);
    }

    @GetMapping("/{customerID}")
    @CrossOrigin
    ResponseEntity<Customer> getCustomer(@PathVariable("customerID") String customerID) {
        Customer customer = customerService.getCustomer(customerID);
        return ResponseEntity.status(HttpStatus.OK).body(customer);
    }

    @PutMapping("/{customerID}")
    @CrossOrigin
    ResponseEntity<String> updateUser(@PathVariable String customerID, @RequestBody CustomerRequest request) {
        customerService.updateCustomer(customerID, request);
        return ResponseEntity.status(HttpStatus.OK).body("Customer updated successfully!");
    }

    @DeleteMapping("/{customerID}")
    @CrossOrigin
    ResponseEntity<String> deleteCustomer(@PathVariable String customerID) {
        try {
            customerService.deleteCustomer(customerID);
            return ResponseEntity.status(HttpStatus.OK).body("Customer deleted successfully!");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Unexpected error: " + e.getMessage());
        }
    }
}
