package com.clothing_store.dto.key;

import jakarta.persistence.Embeddable;

import java.util.Objects;

@Embeddable
public class PromotionProductKey {
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

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        PromotionProductKey that = (PromotionProductKey) o;
        return Objects.equals(productId, that.productId) && Objects.equals(promotionId, that.promotionId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(productId, promotionId);
    }
}
