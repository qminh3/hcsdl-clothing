package com.clothing_store.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "orders")
public class Order {
    public enum Status {
        pending,
        delivered,
        cancelled
    }

    @Id
    private String orderId;
    private String orderName;
    @Enumerated(EnumType.STRING)
    private Status status;
    private String customerId;
    private String employeeId;

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

    public String getOrderName() {
        return orderName;
    }

    public void setOrderName(String orderName) {
        this.orderName = orderName;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public String getCustomerId() {
        return customerId;
    }

    public void setCustomerId(String customerId) {
        this.customerId = customerId;
    }

    public String getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(String employeeId) {
        this.employeeId = employeeId;
    }
}
