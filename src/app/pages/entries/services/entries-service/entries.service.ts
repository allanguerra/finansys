import { Injectable, Injector } from '@angular/core';

import { endpoints } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
import { catchError, flatMap } from 'rxjs/operators';

import { BaseService } from 'src/app/shared/services/base.service';
import { CategoriesService } from 'src/app/pages/categories/services/categories-service/categories.service';

import { Entry } from 'src/app/shared/models/entry.model';
import { Category } from 'src/app/shared/models/category.model';

@Injectable({
  providedIn: 'root'
})
export class EntriesService extends BaseService<Entry> {

  constructor(
    protected injector: Injector,
    protected categoriesService: CategoriesService
  ) {
    super(
      endpoints.entries,
      injector,
      Entry.fromData
    );
  }

  store(entry: Entry): Observable<Entry> {
    return this.setCategoryAndSend(entry, super.store.bind(this));
  }

  update(entry: Entry): Observable<Entry> {
    return this.setCategoryAndSend(entry, super.update.bind(this));
  }

  // PRIVATE METHODS

  private setCategoryAndSend(
    entry: Entry,
    sendFn: (entry: Entry) => Observable<Entry>
  ): Observable<Entry> {
    return this.categoriesService.getById(entry.categoryId)
      .pipe(
        flatMap((category: Category) => {
          entry.category = category;
          return sendFn(entry)
        }),
        catchError(this.handleError)
      );
  }
}
