import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  readonly baseUrl = 'https://fakestoreapi.com/products';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    const url = this.baseUrl;
    return this.http.get(url);
  }

  getCategoryProduct(category: string): Observable<any> {
    const url = `${this.baseUrl}/category/${category}`;
    return this.http.get(url);
  }

  getProduct(id: number): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get(url);
  }

  getCategories(): Observable<any> {
    const url = `${this.baseUrl}/categories`;
    return this.http.get(url);
  }

  addProduct(product: any): Observable<any> {
    const url = this.baseUrl;
    return this.http.post(url, JSON.stringify(product));
  }

  deleteProduct(id: number): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete(url);
  }

  sortProducts(sortBy: string): Observable<any> {
    const url = `${this.baseUrl}?sort=${sortBy}`;
    return this.http.get(url);
  }
  
}
