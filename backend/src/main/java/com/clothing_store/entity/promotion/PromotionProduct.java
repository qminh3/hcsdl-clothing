package com.clothing_store.entity.promotion;

import com.clothing_store.dto.key.PromotionProductKey;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "product_promotion")
public class PromotionProduct {
    @EmbeddedId
    private PromotionProductKey id;

    public String getProductId() {
        return id.getProductId();
    }

    public String getPromotionId() {
        return id.getPromotionId();
    }
}
