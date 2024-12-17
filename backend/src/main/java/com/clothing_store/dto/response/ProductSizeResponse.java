package com.clothing_store.dto.response;

public class ProductSizeResponse {
    private String productId;
    private String size;

    public String getProductId() {
        return productId;
    }

    public void setProductId(String productId) {
        this.productId = productId;
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public static ProductSizeResponse convertToProductSizeResponse(Object data) {
        ProductSizeResponse response = new ProductSizeResponse();

        // Kiểm tra nếu đối tượng là kiểu mảng Object[]
        if (data instanceof Object[]) {
            Object[] row = (Object[]) data;

            // Ánh xạ các giá trị vào ProductResponse
            response.setProductId((String) row[0]); // productId
            response.setSize((String) row[1]); // name
        }

        return response;
    }
}
