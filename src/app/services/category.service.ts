import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'http://localhost:3000'; // Replace with your API endpoint URL

  constructor(private http: HttpClient) { }

  getAllCategories(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/category/list`);
  }

  getCategoryById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/category/detail/${id}`);
  }

  createCategory(category: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/category/add`, category);
  }

  updateCategory(id: number, category: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/category/update/${id}`, category);
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/category/${id}`);
  }
}
