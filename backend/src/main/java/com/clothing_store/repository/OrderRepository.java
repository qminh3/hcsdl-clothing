package com.clothing_store.repository;

import com.clothing_store.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, String> {
    @Procedure(name = "InsertOrder")
    String insertOrder(
      @Param("p_order_name") String order_name,
      @Param("p_status") String status,
      @Param("p_customer_id") String customer_id,
      @Param("p_employee_id") String employee_id
    );

    @Procedure(procedureName = "UpdateOrder")
    void updateOrder(
            @Param("p_order_id") String p_order_id,
            @Param("p_new_status") String p_new_status
    );

    @Procedure(name = "InsertOrderDetails")
    void insertOrderDetails(
            @Param("p_order_id") String order_id,
            @Param("p_product_id") String product_id,
            @Param("p_price") BigDecimal price,
            @Param("p_quantity") Integer quantity,
            @Param("p_order_date") Date order_date
    );

    // Native Query
    @Query(value = "SELECT * FROM orders", nativeQuery = true)
    List<Order> getAllOrder();

    @Query(value = "SELECT * FROM orders WHERE order_id = :orderId", nativeQuery = true)
    Order getOrderById(@Param("orderId") String orderId);

    @Query(value = "SELECT * FROM order_details", nativeQuery = true)
    List<Object> getAllOrderDetail();

    @Query(value = "SELECT * FROM order_details WHERE order_id = :orderId", nativeQuery = true)
    List<Object> getOrderDetailById(@Param("orderId") String orderId);

    @Procedure(name = "DeleteOrder")
    void deleteOrder(
            @Param("p_order_id") String p_order_id
    );
}
