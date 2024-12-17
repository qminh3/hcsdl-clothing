package com.clothing_store.service;

import com.clothing_store.dto.request.insert.CustomerRequest;
import com.clothing_store.entity.user.Customer;
import com.clothing_store.repository.CustomerRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerService extends UserService{
    @Autowired
    private CustomerRepository customerRepository;

    @Transactional
    public void createCustomer(CustomerRequest request){
        try {
            // Chuyển List<String> thành chuỗi JSON
            String userId = userRepository.insertUser(
                    request.getFirstName(),
                    request.getLastName(),
                    request.getPhoneNumber(),
                    request.getPassword(),
                    request.getEmail()
            );

            // Gọi thủ tục insertCustomer và truyền tham số vào
            customerRepository.insertCustomer(
                    userId,
                    request.getRegistrationDate()
            );

            for (String address: request.getAddresses()) {
                customerRepository.insertCustomerAddress(
                        userId,
                        address
                );
            }

            // Nếu mọi thứ thành công, có thể trả về thông báo thành công
            System.out.println("Customer created successfully!");

        } catch (Exception e) {
            // Bắt mọi lỗi khác (ví dụ lỗi từ database, hoặc lỗi khi gọi thủ tục)
            throw new RuntimeException("Error creating customer: " + e.getMessage());
        }
    }

    @Transactional
    public List<Customer> getCustomers() {return customerRepository.getAllCustomers();}

    @Transactional
    public Customer getCustomer(String customerID) {
        return customerRepository.getCustomerById(customerID);
    }

    @Transactional
    public void updateCustomer(String customerID, CustomerRequest request) {
        userRepository.updateUser(
                customerID,
                request.getPhoneNumber(),
                request.getPassword(),
                request.getEmail()
        );
    }

    @Transactional
    public void deleteCustomer(String customerID) {
        try {
            customerRepository.deleteCustomer(customerID);
        } catch (DataAccessException e) {
            // Xử lý lỗi nếu Stored Procedure trả về thông báo lỗi
            if (e.getMessage().contains("CustomerID không tồn tại!")) {
                throw new IllegalArgumentException("CustomerID không tồn tại!");
            } else {
                throw new RuntimeException("Lỗi không xác định từ database: " + e.getMessage());
            }
        }
    }
}
