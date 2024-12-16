package com.clothing_store.repository.promotion;

import com.clothing_store.dto.key.PromotionProductKey;
import com.clothing_store.entity.promotion.PromotionProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PromotionProductRepository extends JpaRepository<PromotionProduct, PromotionProductKey> {
    @Procedure(name = "InsertProductPromotion")
    void insertProductPromotion(
            @Param("p_product_id") String p_product_id,
            @Param("p_promotion_id") String p_promotion_id
    );

    @Query(value = "SELECT * FROM product_promotion", nativeQuery = true)
    List<PromotionProduct> getAllPromotionProducts();
}
