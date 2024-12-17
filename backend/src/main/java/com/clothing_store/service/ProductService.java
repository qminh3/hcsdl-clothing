package com.clothing_store.service;

import com.clothing_store.dto.request.insert.ProductRequest;
import com.clothing_store.dto.request.update.ProductUpdateRequest;
import com.clothing_store.dto.response.ProductColorResponse;
import com.clothing_store.dto.response.ProductSizeResponse;
import com.clothing_store.entity.Product;
import com.clothing_store.repository.ProductRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    @Transactional
    public void createProduct(ProductRequest request) {
        String productId = productRepository.insertProduct(
                request.getDescription(),
                request.getName(),
                request.getPrice()
        );

        for (String color : request.getColors()) {
            productRepository.insertProductColor(
                    productId,
                    color
            );
        }

        for (String size : request.getSizes()) {
            productRepository.insertProductSize(
                    productId,
                    size
            );
        }
    }

    @Transactional
    public List<Product> getProducts() {
        return productRepository.getAllProducts();
    }

    @Transactional
    public Product getProduct(String productId) {
        return productRepository.getProductById(productId);
    }

    @Transactional
    public List<ProductColorResponse> getProductColors() {
        List<Object> raw_list = productRepository.getAllProductColors();
        List<ProductColorResponse> data_list = new ArrayList<>();

        for (Object raw_data : raw_list) {
            ProductColorResponse data = ProductColorResponse.convertToProductColorResponse(raw_data);
            data_list.add(data);
        }
        return data_list;
    }

    @Transactional
    public List<ProductColorResponse> getProductColor(String productId) {
        List<Object> raw_list = productRepository.getProductColorById(productId);
        List<ProductColorResponse> data_list = new ArrayList<>();

        for (Object raw_data : raw_list) {
            ProductColorResponse data = ProductColorResponse.convertToProductColorResponse(raw_data);
            data_list.add(data);
        }
        return data_list;
    }

    @Transactional
    public List<ProductSizeResponse> getProductSizes() {
        List<Object> raw_list = productRepository.getAllProductSizes();
        List<ProductSizeResponse> data_list = new ArrayList<>();

        for (Object raw_data : raw_list) {
            ProductSizeResponse data = ProductSizeResponse.convertToProductSizeResponse(raw_data);
            data_list.add(data);
        }
        return data_list;
    }

    @Transactional
    public List<ProductSizeResponse> getProductSize(String productId) {
        List<Object> raw_list = productRepository.getProductSizeById(productId);
        List<ProductSizeResponse> data_list = new ArrayList<>();

        for (Object raw_data : raw_list) {
            ProductSizeResponse data = ProductSizeResponse.convertToProductSizeResponse(raw_data);
            data_list.add(data);
        }
        return data_list;
    }

    @Transactional
    public void updateProduct(String productId, ProductUpdateRequest request) {
        productRepository.updateProduct(
                productId,
                request.getPrice()
        );
    }

    @Transactional
    public void deleteProduct(String productId) {
        productRepository.deleteProduct(productId);
    }
}
