import { Injectable, Injector } from '@angular/core';

import { Category } from 'src/app/shared/models/category.model';
import { BaseService } from 'src/app/shared/services/base.service';
import { endpoints } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService extends BaseService<Category> {

  constructor(
    protected injector: Injector
  ) {
    super(
      endpoints.categories,
      injector,
      Category.fromData)
  }
}
