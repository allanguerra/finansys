import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BASE_URL, endpoints } from '../../../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, flatMap } from 'rxjs/operators';

import { CategoriesService } from 'src/app/pages/categories/services/categories-service/categories.service';
import { Entry } from 'src/app/models/entry.model';
import { Category } from 'src/app/models/category.model';

@Injectable({
  providedIn: 'root'
})
export class EntriesService {

  constructor(
    private http: HttpClient,
    private categoriesService: CategoriesService
  ) { }

  getAll(): Observable<Entry[]> {
    return this.http.get<Entry[]>(`${BASE_URL}/${endpoints.entries}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getById(id: number): Observable<Entry> {
    return this.http.get<Entry>(`${BASE_URL}/${endpoints.entries}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  store(entry: Entry): Observable<Entry> {
    return this.categoriesService.getById(entry.categoryId)
      .pipe(
        flatMap((category: Category) => {
          entry.category = category;
          return this.http.post<Entry>(`${BASE_URL}/${endpoints.entries}`, entry)
            .pipe(
              catchError(this.handleError)
            );
        })
      );
  }

  update(entry: Entry): Observable<Entry> {
    return this.categoriesService.getById(entry.categoryId)
      .pipe(
        flatMap((category: Category) => {
          entry.category = category;
          return this.http.put<Entry>(`${BASE_URL}/${endpoints.entries}/${entry.id}`, entry)
            .pipe(
              catchError(this.handleError)
            );
        })
      );
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${BASE_URL}/${endpoints.entries}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any): Observable<any> {
    console.log(`Error on requisition: ${error}`);
    return throwError(error);
  }
}
