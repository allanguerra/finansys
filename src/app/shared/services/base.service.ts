import { Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { BaseModel } from '../models/base.model';
import { BASE_URL } from 'src/environments/environment';

export abstract class BaseService<T extends BaseModel> {

  protected http: HttpClient;

  constructor(
    protected endpoint: string,
    protected injector: Injector,
    protected dataToModelFn: (data: any) => T
  ) {
    this.http = injector.get(HttpClient);
  }

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(`${BASE_URL}/${this.endpoint}`)
      .pipe(
        map(this.dataToArrayModel.bind(this)),
        catchError(this.handleError)
      );
  }

  getById(id: number): Observable<T> {
    return this.http.get<T>(`${BASE_URL}/${this.endpoint}/${id}`)
      .pipe(
        map(this.dataToModel.bind(this)),
        catchError(this.handleError)
      );
  }

  store(resource: T): Observable<T> {
    return this.http.post<T>(`${BASE_URL}/${this.endpoint}`, resource)
      .pipe(
        map(this.dataToModel.bind(this)),
        catchError(this.handleError)
      );
  }

  update(resource: T): Observable<T> {
    return this.http.put<T>(`${BASE_URL}/${this.endpoint}/${resource.id}`, resource)
      .pipe(
        map(this.dataToModel.bind(this)),
        catchError(this.handleError)
      );
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${BASE_URL}/${this.endpoint}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // PRIVATE METHODS

  private handleError(error: any): Observable<any> {
    console.log(`Error on requisition: ${error}`);
    return throwError(error);
  }

  private dataToModel(data: any): T {
    return this.dataToModelFn(data);
  }

  private dataToArrayModel(data: []): T[] {
    const resources: T[] = [];
    data
      .forEach(element => resources.push(this.dataToModelFn(element)));

    return resources;
  }
}
