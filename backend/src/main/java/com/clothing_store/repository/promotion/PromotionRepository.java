package com.clothing_store.repository.promotion;

import com.clothing_store.entity.promotion.Promotion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface PromotionRepository extends JpaRepository<Promotion, String> {
    @Procedure(name = "InsertPromotion")
    void insertPromotion(
            @Param("p_name") String p_name,
            @Param("p_discount") Integer p_discount,
            @Param("p_sdate") Date p_sdate,
            @Param("p_edate") Date p_edate
    );

    @Query(value = "SELECT * FROM promotion", nativeQuery = true)
    List<Promotion> getAllPromotions();

    @Query(value = "SELECT * FROM promotion WHERE promotion_id = :promotionId", nativeQuery = true)
    Promotion getPromotionById(@Param("promotionId") String promotionId);

    @Procedure(procedureName = "DeletePromotion")
    void deletePromotion(@Param("p_promotion_id") String p_promotion_id);
}
