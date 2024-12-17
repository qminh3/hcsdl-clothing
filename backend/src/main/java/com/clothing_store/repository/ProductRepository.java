package com.clothing_store.repository;

import com.clothing_store.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, String> {
    @Procedure(procedureName = "InsertProduct")
    String insertProduct(@Param("p_description") String description,
                       @Param("p_name") String name,
                       @Param("p_price") BigDecimal price);

    @Procedure(procedureName = "UpdateProduct")
    void updateProduct(
            @Param("p_product_id") String product_id,
            @Param("p_price") BigDecimal price
    );

    @Procedure(procedureName = "InsertProductColor")
    void insertProductColor(@Param("p_product_id") String product_id,
                           @Param("p_color") String color);

    @Procedure(procedureName = "InsertProductSize")
    void insertProductSize(@Param("p_product_id") String product_id,
                           @Param("p_size") String size);

    @Query(value = "SELECT * FROM product", nativeQuery = true)
    List<Product> getAllProducts();

    @Query(value = "SELECT * FROM product WHERE product_id = :productId", nativeQuery = true)
    Product getProductById(@Param("productId") String productId);

    @Query(value = "SELECT * FROM product_color", nativeQuery = true)
    List<Object> getAllProductColors();

    @Query(value = "SELECT * FROM product_color WHERE product_id = :productId", nativeQuery = true)
    List<Object> getProductColorById(@Param("productId") String productId);

    @Query(value = "SELECT * FROM product_size", nativeQuery = true)
    List<Object> getAllProductSizes();

    @Query(value = "SELECT * FROM product_size WHERE product_id = :productId", nativeQuery = true)
    List<Object> getProductSizeById(@Param("productId") String productId);

    @Procedure(procedureName = "DeleteProduct")
    void deleteProduct(@Param("p_product_id") String product_id);
}
