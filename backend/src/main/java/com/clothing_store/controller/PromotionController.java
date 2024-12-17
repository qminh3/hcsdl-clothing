package com.clothing_store.controller;

import com.clothing_store.dto.request.insert.promotion.PromotionOrderRequest;
import com.clothing_store.dto.request.insert.promotion.PromotionProductRequest;
import com.clothing_store.dto.request.insert.promotion.PromotionRequest;
import com.clothing_store.entity.promotion.Promotion;
import com.clothing_store.entity.promotion.PromotionOrder;
import com.clothing_store.entity.promotion.PromotionProduct;
import com.clothing_store.service.PromotionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/promotions")
public class PromotionController {
    @Autowired
    private PromotionService promotionService;

    @PostMapping
    @CrossOrigin
    public ResponseEntity<String> createPromotion(@RequestBody PromotionRequest request) {
        promotionService.createPromtion(request);
        return ResponseEntity.status(HttpStatus.CREATED).body("Promtion created successfully!");
    }

    @PostMapping("/orders")
    @CrossOrigin
    public ResponseEntity<String> createPromotionOrder(@RequestBody PromotionOrderRequest request) {
        promotionService.createPromotionOrder(request);
        return ResponseEntity.status(HttpStatus.CREATED).body("PromotionOrder created successfully!");
    }

    @PostMapping("/products")
    @CrossOrigin
    public ResponseEntity<String> createPromotionProduct(@RequestBody PromotionProductRequest request) {
        promotionService.createPromotionProduct(request);
        return ResponseEntity.status(HttpStatus.CREATED).body("PromotionProduct created successfully!");
    }

    @GetMapping("/orders")
    @CrossOrigin
    public ResponseEntity<List<PromotionOrder>> getPromtionOrders() {
        return ResponseEntity.status(HttpStatus.OK).body(promotionService.getPromotionOrders());
    }

    @GetMapping("/products")
    @CrossOrigin
    public ResponseEntity<List<PromotionProduct>> getPromtionProducts() {
        return ResponseEntity.status(HttpStatus.OK).body(promotionService.getPromotionProducts());
    }

    @GetMapping
    @CrossOrigin
    public ResponseEntity<List<Promotion>> getPromtions() {
        return ResponseEntity.status(HttpStatus.OK).body(promotionService.getPromotions());
    }

    @GetMapping("/{promotionId}")
    @CrossOrigin
    ResponseEntity<Promotion> getPromotion(@PathVariable("promotionId") String promotionId) {
        return ResponseEntity.status(HttpStatus.OK).body(promotionService.getPromotion(promotionId));
    }

    @DeleteMapping("/{promotionId}")
    @CrossOrigin
    ResponseEntity<String> deletePromotion(@PathVariable String promotionId) {
        promotionService.deletePromotion(promotionId);
        return ResponseEntity.status(HttpStatus.OK).body("Promotion deleted successfully!");
    }
}
