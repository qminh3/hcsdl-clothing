package com.clothing_store.entity.promotion;

import com.clothing_store.dto.key.PromotionOrderKey;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "order_promotion")
public class PromotionOrder {
    @EmbeddedId
    private PromotionOrderKey id;

    public String getOrderId() {
        return id.getOrderId();
    }

    public String getPromotionId() {
        return id.getPromotionId();
    }
}
