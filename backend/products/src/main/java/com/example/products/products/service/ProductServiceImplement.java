package com.example.products.products.service;

import com.example.products.products.models.entities.Product;
import com.example.products.products.repositories.ProductRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ProductServiceImplement implements ProductService{

    private final ProductRepository productRepository;

    public ProductServiceImplement(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public List<Product> getAllProducts() {
        return (List<Product>) productRepository.findAll();
    }

    @Override
    public Optional<Product> getProductById(long id) {
        return productRepository.findById(id);
    }

    @Override
    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    @Override
    public Product updateProduct(long id, Product product) {
        if(!productRepository.existsById(id)) {
            throw new IllegalArgumentException("Product with id " + id + " does not exist.");
        }
        product.setId(id);
        return productRepository.save(product);
    }

    @Override
    public void deleteProduct(long id) {
        if(!productRepository.existsById(id)) {
            throw new IllegalArgumentException("Product with id " + id + " does not exist.");
        }
        productRepository.deleteById(id);
    }
}
