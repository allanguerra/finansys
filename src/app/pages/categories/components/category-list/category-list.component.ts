import { Component, OnInit } from '@angular/core';

import { CategoriesService } from '../../services/categories-service/categories.service';
import { Category } from 'src/app/shared/models/category.model';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  public categories: Category[] = [];

  constructor(
    private categoriesService: CategoriesService
  ) { }

  ngOnInit() {
    this.getCategories();
  }

  public remove(id: number): void {
    if(confirm('Deseja excluir este item?')) {
      this.categoriesService.remove(id).subscribe(_ => {
        this.getCategories();
      });
    }
  }

  private getCategories(): void {
    this.categoriesService.getAll().subscribe((categories: Category[]) => {
      this.categories = categories;
    });
  }

}
