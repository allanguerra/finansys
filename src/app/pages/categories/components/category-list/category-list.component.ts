import { Component } from '@angular/core';
import { BaseListComponent } from 'src/app/shared/components/base-list.component';

import { CategoriesService } from '../../services/categories-service/categories.service';
import { Category } from 'src/app/shared/models/category.model';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent extends BaseListComponent<Category> {

  constructor(
    protected categoriesService: CategoriesService
  ) {
    super(categoriesService);
  }

}
