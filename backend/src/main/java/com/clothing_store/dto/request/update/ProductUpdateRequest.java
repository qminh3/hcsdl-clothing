package com.clothing_store.dto.request.update;

import java.math.BigDecimal;

public class ProductUpdateRequest {
    private BigDecimal price;

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }
}
