package com.clothing_store.repository.promotion;

import com.clothing_store.dto.key.PromotionOrderKey;
import com.clothing_store.entity.promotion.Promotion;
import com.clothing_store.entity.promotion.PromotionOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PromotionOrderRepository extends JpaRepository<PromotionOrder, PromotionOrderKey> {
    @Procedure(name = "InsertOrderPromotion")
    void insertOrderPromotion(
            @Param("p_order_id") String p_order_id,
            @Param("p_promotion_id") String p_promotion_id
    );

    @Query(value = "SELECT * FROM order_promotion", nativeQuery = true)
    List<PromotionOrder> getAllPromotionOrders();

}
