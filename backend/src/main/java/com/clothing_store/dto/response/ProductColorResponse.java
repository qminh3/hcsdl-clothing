package com.clothing_store.dto.response;

public class ProductColorResponse {
    private String productId;
    private String color;

    public String getProductId() {
        return productId;
    }

    public void setProductId(String productId) {
        this.productId = productId;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public static ProductColorResponse convertToProductColorResponse(Object data) {
        ProductColorResponse response = new ProductColorResponse();

        // Kiểm tra nếu đối tượng là kiểu mảng Object[]
        if (data instanceof Object[]) {
            Object[] row = (Object[]) data;

            // Ánh xạ các giá trị vào ProductResponse
            response.setProductId((String) row[0]); // productId
            response.setColor((String) row[1]); // name
        }

        return response;
    }
}
