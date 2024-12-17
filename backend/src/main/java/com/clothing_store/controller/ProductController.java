package com.clothing_store.controller;

import com.clothing_store.dto.request.insert.ProductRequest;
import com.clothing_store.dto.request.update.ProductUpdateRequest;
import com.clothing_store.dto.response.ProductColorResponse;
import com.clothing_store.dto.response.ProductSizeResponse;
import com.clothing_store.entity.Product;
import com.clothing_store.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {
    @Autowired
    private ProductService productService;

    @PostMapping
    @CrossOrigin
    ResponseEntity<String> createProduct(@RequestBody ProductRequest request) {
        productService.createProduct(request);
        return ResponseEntity.status(HttpStatus.CREATED).body("Product created successfully!");
    }

    @GetMapping
    @CrossOrigin
    ResponseEntity<List<Product>> getProducts() {
        return ResponseEntity.status(HttpStatus.OK).body(productService.getProducts());
    }

    @GetMapping("/{productId}")
    @CrossOrigin
    ResponseEntity<Product> getProduct(@PathVariable("productId") String productId) {
        return ResponseEntity.status(HttpStatus.OK).body(productService.getProduct(productId));
    }

    @GetMapping("/colors")
    @CrossOrigin
    ResponseEntity<List<ProductColorResponse>> getProductColors() {
        return ResponseEntity.status(HttpStatus.OK).body(productService.getProductColors());
    }

    @GetMapping("/colors/{productId}")
    @CrossOrigin
    ResponseEntity<List<ProductColorResponse>> getProductColor(@PathVariable("productId") String productId) {
        return ResponseEntity.status(HttpStatus.OK).body(productService.getProductColor(productId));
    }

    @GetMapping("/sizes")
    @CrossOrigin
    ResponseEntity<List<ProductSizeResponse>> getProductSizes() {
        return ResponseEntity.status(HttpStatus.OK).body(productService.getProductSizes());
    }

    @GetMapping("/sizes/{productId}")
    @CrossOrigin
    ResponseEntity<List<ProductSizeResponse>> getProductSize(@PathVariable("productId") String productId) {
        return ResponseEntity.status(HttpStatus.OK).body(productService.getProductSize(productId));
    }

    @PutMapping("/{productId}")
    @CrossOrigin
    ResponseEntity<String> updateProduct(@PathVariable String productId, @RequestBody ProductUpdateRequest request) {
        productService.updateProduct(productId, request);
        return ResponseEntity.status(HttpStatus.OK).body("Product updated successfully!");
    }

    @DeleteMapping("/{productId}")
    @CrossOrigin
    ResponseEntity<String> deleteProduct(@PathVariable String productId) {
        productService.deleteProduct(productId);
        return ResponseEntity.status(HttpStatus.OK).body("Product deleted successfully!");
    }
}
