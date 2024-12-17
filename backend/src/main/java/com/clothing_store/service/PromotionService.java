package com.clothing_store.service;

import com.clothing_store.dto.request.insert.promotion.PromotionOrderRequest;
import com.clothing_store.dto.request.insert.promotion.PromotionProductRequest;
import com.clothing_store.dto.request.insert.promotion.PromotionRequest;
import com.clothing_store.entity.promotion.Promotion;
import com.clothing_store.entity.promotion.PromotionOrder;
import com.clothing_store.entity.promotion.PromotionProduct;
import com.clothing_store.repository.promotion.PromotionOrderRepository;
import com.clothing_store.repository.promotion.PromotionProductRepository;
import com.clothing_store.repository.promotion.PromotionRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PromotionService {
    @Autowired
    private PromotionRepository promotionRepository;

    @Autowired
    private PromotionOrderRepository promotionOrderRepository;

    @Autowired
    private PromotionProductRepository promotionProductRepository;

    @Transactional
    public void createPromtion(PromotionRequest request) {
        promotionRepository.insertPromotion(
                request.getName(),
                request.getDiscount(),
                request.getStartDate(),
                request.getEndDate()
        );
    }

    @Transactional
    public void createPromotionOrder(PromotionOrderRequest request) {
        promotionOrderRepository.insertOrderPromotion(
                request.getOrderId(),
                request.getPromotionId()
        );
    }

    @Transactional
    public void createPromotionProduct(PromotionProductRequest request) {
        promotionProductRepository.insertProductPromotion(
                request.getProductId(),
                request.getPromotionId()
        );
    }

    @Transactional
    public List<Promotion> getPromotions() {
        return promotionRepository.getAllPromotions();
    }

    @Transactional
    public List<PromotionOrder> getPromotionOrders() {
        return promotionOrderRepository.getAllPromotionOrders();
    }

    @Transactional
    public List<PromotionProduct> getPromotionProducts() {
        return promotionProductRepository.getAllPromotionProducts();
    }

    @Transactional
    public Promotion getPromotion(String promotionId) {
        return promotionRepository.getPromotionById(promotionId);
    }

    @Transactional
    public void deletePromotion(String promotionId) {
        promotionRepository.deletePromotion(promotionId);
    }
}
