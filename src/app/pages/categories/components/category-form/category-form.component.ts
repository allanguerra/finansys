import { Component, Injector } from '@angular/core';
import { BaseFormComponent } from 'src/app/shared/components/base-form.component';

import { Validators } from '@angular/forms';
import { switchMap } from 'rxjs/operators';

import { CategoriesService } from '../../services/categories-service/categories.service';
import { Category } from 'src/app/shared/models/category.model';
import { inject } from '@angular/core/testing';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent extends BaseFormComponent<Category> {

  constructor(
    protected injector: Injector,
    protected categoriesService: CategoriesService
  ) {
    super(
      new Category(),
      injector,
      categoriesService,
      Category.fromData
    );
  }

  // PROTECTED METHODS

  protected buildModelForm(): void {
    this.modelForm = this.fb.group({
      id: [null],
      title: [null, [Validators.required, Validators.minLength(3)]],
      description: [null]
    });
  }

  protected setNewPageTitle(): string {
    return 'Nova Categoria';
  }

  protected setEditPageTitle(): string {
    return `Atualizar a categoria: ${this.model.title}`;
  }

  protected setMessage(): string {
    return 'Categoria salva com sucesso!';
  }

}
