import { Component, OnInit } from '@angular/core';
import { ApiProductsService } from '../../../services/api-products/api-products.service';
import { CommonModule } from '@angular/common';
import { Product } from '../../../models/product';
import { FormsModule } from '@angular/forms';

declare var $: any;

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];

  newProduct: Product = {
    name: '',
    description: '',
    price: 0
  };

  productToEdit: Product = {
    id: undefined,
    name: '',
    description: '',
    price: 0
  };


  constructor(private apiService: ApiProductsService) { }

  ngOnInit(): void {
    this.apiService.getProducts().subscribe(data => {
      this.products = data;

      setTimeout(() => {
        if ($.fn.DataTable.isDataTable('#productsTable')) {
          $('#productsTable').DataTable().destroy();
        }
        $('#productsTable').DataTable();
      }, 100);
    });
  }


  addNewProduct(): void {
    const modal = document.getElementById('createProductModal');
    if (modal) {
      modal.classList.add('active');
    }
  }

  closeModal(): void {
    const modal = document.getElementById('createProductModal');
    if (modal) {
      modal.classList.remove('active');
      this.newProduct = { name: '', description: '', price: 0 };
    }
  }

  createProduct(): void {
    const newItem: Product = {
      ...this.newProduct,
    };

    this.apiService.createProduct(newItem).subscribe({
      next: (createdProduct) => {
        this.products.push(createdProduct);
        this.newProduct = { name: '', description: '', price: 0 };
        this.closeModal();

        setTimeout(() => {
          $('#productsTable').DataTable().destroy();
          $('#productsTable').DataTable();
        }, 0);
      },
      error: (err) => {
        console.error('Error create product!', err);
      }
    });
  }


  editProduct(id: number | undefined): void {
    if (id === undefined) return;

    const found = this.products.find(p => p.id === id);
    if (found) {
      this.productToEdit = { ...found };

      const modal = document.getElementById('editProductModal');
      if (modal) {
        modal.classList.add('active');
      }
    }
  }

  updateProduct(): void {
    if (this.productToEdit.id === undefined) return;

    this.apiService.updateProduct(this.productToEdit.id, this.productToEdit).subscribe({
      next: (updatedProduct) => {
        const index = this.products.findIndex(p => p.id === this.productToEdit.id);
        if (index !== -1) {
          this.products[index] = updatedProduct;
        }

        this.closeEditModal();
        setTimeout(() => {
          $('#productsTable').DataTable().destroy();
          $('#productsTable').DataTable();
        }, 0);
      },
      error: (err) => {
        console.error('Error updating product:', err);
      }
    });
  }


  closeEditModal(): void {
    const modal = document.getElementById('editProductModal');
    if (modal) {
      modal.classList.remove('active');
    }
  }



  deleteProduct(id: number | undefined): void {
    if (id === undefined) return;

    const confirmDelete = confirm('Are you sure you want to delete this product?');
    if (!confirmDelete) return;

    this.apiService.deleteProduct(id).subscribe({
      next: () => {
        this.products = this.products.filter(p => p.id !== id);

        setTimeout(() => {
          $('#productsTable').DataTable().destroy();
          $('#productsTable').DataTable();
        }, 0);
      },
      error: (err) => {
        console.error('Error deleting product:', err);
      }
    });
  }



}
