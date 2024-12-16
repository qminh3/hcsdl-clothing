package com.clothing_store.dto.request.insert.promotion;

public class PromotionProductRequest {
    private String productId;
    private String promotionId;

    public String getProductId() {
        return productId;
    }

    public void setProductId(String productId) {
        this.productId = productId;
    }

    public String getPromotionId() {
        return promotionId;
    }

    public void setPromotionId(String promotionId) {
        this.promotionId = promotionId;
    }
}
