package com.example.categorias.categories.repositories;

import com.example.categorias.categories.models.entities.Category;
import org.springframework.data.repository.CrudRepository;

public interface CategoryRepository extends CrudRepository<Category,Long> {
}
