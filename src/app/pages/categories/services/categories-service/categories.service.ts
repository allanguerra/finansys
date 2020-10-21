import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BASE_URL, endpoints } from '../../../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Category } from 'src/app/shared/models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(`${BASE_URL}/${endpoints.categories}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getById(id: number): Observable<Category> {
    return this.http.get<Category>(`${BASE_URL}/${endpoints.categories}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  store(category: Category): Observable<Category> {
    return this.http.post<Category>(`${BASE_URL}/${endpoints.categories}`, category)
      .pipe(
        catchError(this.handleError)
      );
  }

  update(category: Category): Observable<Category> {
    return this.http.put<Category>(`${BASE_URL}/${endpoints.categories}/${category.id}`, category)
      .pipe(
        catchError(this.handleError)
      );
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${BASE_URL}/${endpoints.categories}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any): Observable<any> {
    console.log(`Error on requisition: ${error}`);
    return throwError(error);
  }
}
