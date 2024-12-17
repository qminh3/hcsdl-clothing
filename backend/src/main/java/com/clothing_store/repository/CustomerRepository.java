package com.clothing_store.repository;

import com.clothing_store.entity.user.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, String> {
    @Procedure(procedureName = "InsertCustomer")
    void insertCustomer(@Param("new_user_id") String userId,
                          @Param("p_registration_date") String registrationDate);

    @Procedure(procedureName = "DeleteCustomer")
    void deleteCustomer(@Param("p_customer_id") String userId);

    @Procedure(procedureName = "InsertCustomerAddress")
    void insertCustomerAddress(@Param("p_customer_id") String userId,
                               @Param("p_address") String address);

    @Procedure(procedureName = "GetCustomerById")
    Customer getCustomerById(@Param("p_customer_id") String customerId);

    @Procedure(procedureName = "GetAllCustomers")
    List<Customer> getAllCustomers();
}
