import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiCategoriesService } from '../../../services/api-categories/api-categories.service';
import { Category } from '../../../models/category';
import { FormsModule } from '@angular/forms';

declare var $: any;

@Component({
  selector: 'app-categories',
  imports: [CommonModule, FormsModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];

  newCategory: Category = {
    name: '',
    description: ''
  };

  categoryToEdit: Category = {
    id: undefined,
    name: '',
    description: ''
  };

  constructor(private apiService: ApiCategoriesService) { }

  ngOnInit(): void {
    this.apiService.getCategories().subscribe(data => {
      this.categories = data;

      setTimeout(() => {
        if ($.fn.DataTable.isDataTable('#categoriesTable')) {
          $('#categoriesTable').DataTable().destroy();
        }
        $('#categoriesTable').DataTable();
      }, 100);
    });
  }

  addNewCategory(): void {
    const modal = document.getElementById('createCategoryModal');
    if (modal) {
      modal.classList.add('active');
    }
  }

  closeModal(): void {
    const modal = document.getElementById('createCategoryModal');
    if (modal) {
      modal.classList.remove('active');
      this.newCategory = { name: '', description: '' };
    }
  }

  createCategory(): void {
    const newItem: Category = {
      ...this.newCategory,
    };

    this.apiService.createCategory(newItem).subscribe({
      next: (createdProduct) => {
        this.categories.push(createdProduct);
        this.newCategory = { name: '', description: '' };
        this.closeModal();

        setTimeout(() => {
          $('#categoriesTable').DataTable().destroy();
          $('#categoriesTable').DataTable();
        }, 0);
      },
      error: (err) => {
        console.error('Error create category!', err);
      }
    });
  }


  editCategory(id: number | undefined): void {
    if (id === undefined) return;

    const found = this.categories.find(p => p.id === id);
    if (found) {
      this.categoryToEdit = { ...found };

      const modal = document.getElementById('editCategoryModal');
      if (modal) {
        modal.classList.add('active');
      }
    }
  }

  updateCategory(): void {
    if (this.categoryToEdit.id === undefined) return;

    this.apiService.updateCategory(this.categoryToEdit.id, this.categoryToEdit).subscribe({
      next: (updateCategory) => {
        const index = this.categories.findIndex(p => p.id === this.categoryToEdit.id);
        if (index !== -1) {
          this.categories[index] = updateCategory;
        }

        this.closeEditModal();
        setTimeout(() => {
          $('#categoriesTable').DataTable().destroy();
          $('#categoriesTable').DataTable();
        }, 0);
      },
      error: (err) => {
        console.error('Error updating product:', err);
      }
    });
  }


  closeEditModal(): void {
    const modal = document.getElementById('editCategoryModal');
    if (modal) {
      modal.classList.remove('active');
    }
  }


  deleteCategory(id: number | undefined): void {
    if (id === undefined) return;

    const confirmDelete = confirm('Are you sure you want to delete this category?');
    if (!confirmDelete) return;

    this.apiService.deleteCategory(id).subscribe({
      next: () => {
        this.categories = this.categories.filter(p => p.id !== id);

        setTimeout(() => {
          $('#categoriesTable').DataTable().destroy();
          $('#categoriesTable').DataTable();
        }, 0);
      },
      error: (err) => {
        console.error('Error deleting category:', err);
      }
    });
  }
}
