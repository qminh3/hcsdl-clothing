package com.clothing_store.controller;

import com.clothing_store.dto.request.insert.OrderRequest;
import com.clothing_store.dto.request.update.OrderUpdateRequest;
import com.clothing_store.dto.request.update.ProductUpdateRequest;
import com.clothing_store.dto.response.OrderDetailResponse;
import com.clothing_store.entity.Order;
import com.clothing_store.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @PostMapping
    @CrossOrigin
    ResponseEntity<String> createOrder(@RequestBody OrderRequest request) {
        orderService.createOrder(request);
        return ResponseEntity.status(HttpStatus.CREATED).body("Order created successfully!");
    }

    @GetMapping
    @CrossOrigin
    ResponseEntity<List<Order>> getAllOrder() {
        return ResponseEntity.status(HttpStatus.OK).body(orderService.getAllOrder());
    }

    @GetMapping("/{orderId}")
    @CrossOrigin
    ResponseEntity<Order> getOrderById(@PathVariable("orderId") String orderId) {
        return ResponseEntity.status(HttpStatus.OK).body(orderService.getOrderById(orderId));
    }

    @GetMapping("/details")
    @CrossOrigin
    ResponseEntity<List<OrderDetailResponse>> getAllOrderDetail() {
        return ResponseEntity.status(HttpStatus.OK).body(orderService.getAllOrderDetail());
    }

    @GetMapping("/details/{orderId}")
    @CrossOrigin
    ResponseEntity<List<OrderDetailResponse>> getOrderDetailById(@PathVariable("orderId") String orderId) {
        return ResponseEntity.status(HttpStatus.OK).body(orderService.getOrderDetailById(orderId));
    }

    @PutMapping("/{orderId}")
    @CrossOrigin
    ResponseEntity<String> updateOrder(@PathVariable String orderId, @RequestBody OrderUpdateRequest request) {
        orderService.updateOrder(orderId, request);
        return ResponseEntity.status(HttpStatus.OK).body("Product updated successfully!");
    }

    @DeleteMapping("/{orderId}")
    @CrossOrigin
    ResponseEntity<String> deleteOrder(@PathVariable String orderId) {
        orderService.deleteOrder(orderId);
        return ResponseEntity.status(HttpStatus.OK).body("Order deleted successfully!");
    }
}
