package com.example.products.products.service;

import com.example.products.products.models.entities.Product;

import java.util.List;
import java.util.Optional;

public interface ProductService {
    List<Product> getAllProducts();
    Optional<Product> getProductById(long id);
    Product createProduct(Product product);
    Product updateProduct(long id, Product product);
    void deleteProduct(long id);
}
