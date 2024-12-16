package com.clothing_store.service;

import com.clothing_store.dto.request.insert.OrderRequest;
import com.clothing_store.dto.request.update.OrderUpdateRequest;
import com.clothing_store.dto.request.update.ProductUpdateRequest;
import com.clothing_store.dto.response.OrderDetailResponse;
import com.clothing_store.entity.Order;
import com.clothing_store.repository.OrderRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;

    @Transactional
    public void createOrder(OrderRequest request) {
        String orderId = orderRepository.insertOrder(
                request.getOrderName(),
                request.getStatus().name(),
                request.getCustomerId(),
                request.getEmployeeId()
        );

        orderRepository.insertOrderDetails(
                orderId,
                request.getProductId(),
                request.getPrice(),
                request.getQuantity(),
                request.getOrderDate()
        );
    }

    @Transactional
    public List<Order> getAllOrder() {
        return orderRepository.getAllOrder();
    }

    @Transactional
    public Order getOrderById(String orderId) {
        return orderRepository.getOrderById(orderId);
    }

    @Transactional
    public List<OrderDetailResponse> getAllOrderDetail() {
        List<Object> raw_list = orderRepository.getAllOrderDetail();
        List<OrderDetailResponse> orderDetail_list = new ArrayList<>();

        for (Object raw_data : raw_list) {
            OrderDetailResponse orderDetail_data = OrderDetailResponse.convertToOrderDetailResponse(raw_data);
            orderDetail_list.add(orderDetail_data);
        }
        return orderDetail_list;
    }

    @Transactional
    public List<OrderDetailResponse> getOrderDetailById(String orderId) {
        List<Object> raw_list = orderRepository.getOrderDetailById(orderId);
        List<OrderDetailResponse> orderDetail_list = new ArrayList<>();

        for (Object raw_data : raw_list) {
            OrderDetailResponse orderDetail_data = OrderDetailResponse.convertToOrderDetailResponse(raw_data);
            orderDetail_list.add(orderDetail_data);
        }
        return orderDetail_list;
    }

    @Transactional
    public void deleteOrder(String orderId) {
        orderRepository.deleteOrder(orderId);
    }

    @Transactional
    public void updateOrder(String orderId, OrderUpdateRequest request) {
        orderRepository.updateOrder(
                orderId,
                request.getStatus()
        );
    }
}
