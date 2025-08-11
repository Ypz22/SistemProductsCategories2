import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiCategoriesService {

  private baseUrl = 'http://localhost:8082/api';

  constructor(private http: HttpClient) { }

  getCategories(): Observable<any> {
    return this.http.get(`${this.baseUrl}/categories`);
  }

  createCategory(usuario: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/categories`, usuario);
  }

  updateCategory(id: number, usuario: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/categories/${id}`, usuario);
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/categories/${id}`);
  }
}
