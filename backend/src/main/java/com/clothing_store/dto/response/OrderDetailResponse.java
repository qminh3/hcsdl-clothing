package com.clothing_store.dto.response;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Date;

public class OrderDetailResponse {
    private String orderId;
    private String productId;
    private BigDecimal price;
    private Integer quantity;
    private Date orderDate;

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

    public String getProductId() {
        return productId;
    }

    public void setProductId(String productId) {
        this.productId = productId;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Date getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(Date orderDate) {
        this.orderDate = orderDate;
    }

    public static OrderDetailResponse convertToOrderDetailResponse(Object data) {
        OrderDetailResponse response = new OrderDetailResponse();

        // Kiểm tra nếu đối tượng là kiểu mảng Object[]
        if (data instanceof Object[]) {
            Object[] row = (Object[]) data;

            // Ánh xạ các giá trị vào ProductResponse
            response.setOrderId((String) row[0]); // productId
            response.setProductId((String) row[1]); // name
            response.setPrice((BigDecimal) row[2]); // description
            response.setQuantity((Integer) row[3]); // price
            response.setOrderDate((Date) row[4]); // color
        }

        return response;
    }
}
