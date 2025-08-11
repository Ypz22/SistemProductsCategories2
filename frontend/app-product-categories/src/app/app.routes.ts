import { Routes } from '@angular/router';
import { ProductsComponent } from './components/pages/products/products.component';
import { CategoriesComponent } from './components/pages/categories/categories.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    { path: 'products', component: ProductsComponent },
    { path: 'categories', component: CategoriesComponent },
    { path: '', component: HomeComponent },
    { path: '**', redirectTo: 'products' }
];
