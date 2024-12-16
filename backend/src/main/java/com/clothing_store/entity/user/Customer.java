package com.clothing_store.entity.user;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "customer")
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String customerId;

    @OneToOne
    @MapsId
    @JoinColumn(name = "customerId", referencedColumnName = "userId")
    private User user;

    private LocalDate registrationDate;

    @ElementCollection
    @CollectionTable(name = "customer_address", joinColumns = @JoinColumn(name = "customer_id")) @Column(name = "address")
    private List<String> addresses;

    public List<String> getAddresses() {
        return addresses;
    }

    public void setAddresses(List<String> addresses) {
        this.addresses = addresses;
    }

    public String getId() {
        return customerId;
    }

    public void setId(String id) {
        this.customerId = id;
    }
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public LocalDate getRegistrationDate() {
        return registrationDate;
    }

    public void setRegistrationDate(LocalDate registrationDate) {
        this.registrationDate = registrationDate;
    }
}
