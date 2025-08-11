package com.example.products.products.repositories;

import com.example.products.products.models.entities.Product;
import org.springframework.data.repository.CrudRepository;

public interface ProductRepository extends CrudRepository<Product,Long>{
    
}
