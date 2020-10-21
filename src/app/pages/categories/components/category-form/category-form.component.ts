import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { switchMap } from 'rxjs/operators';

import { MessageService } from 'primeng/api';
import { CategoriesService } from '../../services/categories-service/categories.service';
import { Category } from 'src/app/shared/models/category.model';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit, AfterContentChecked {

  public categoryForm: FormGroup;
  public pageTitle: string;
  public errorMessage: string;
  public submitting: boolean = false;

  public category: Category;

  private currentAction: string;

  private readonly TOAST = {severity: 'success', summary: 'Sucesso'};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoriesService: CategoriesService,
    private messageService: MessageService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.setCurrentAction();
    this.buildCategoryForm();
    this.loadCategory();
  }

  ngAfterContentChecked() {
    this.setPageTitle();
  }

  // PUBLIC METHODS

  public submit(): void {
    this.submitting = true;
    if (this.currentAction === 'new') {
      this.storeCategory();
    } else {
      this.updateCategory();
    }
  }

  // PRIVATE METHODS

  private setCurrentAction(): void {
    if (this.route.snapshot.url[0].path === 'new') {
      this.currentAction = 'new';
    } else {
      this.currentAction = 'edit';
    }
  }

  private buildCategoryForm(): void {
    this.categoryForm = this.fb.group({
      id: [null],
      title: [null, [Validators.required, Validators.minLength(3)]],
      description: [null]
    });
  }

  private loadCategory(): void {
    if (this.currentAction === 'edit') {
      this.route.paramMap.pipe(
        switchMap(params => this.categoriesService.getById(+params.get('id')))
      ).subscribe((category: Category) => {
        this.category = category;
        this.categoryForm.patchValue(category);
      });
    }
  }

  private setPageTitle(): void {
    const title = this.category ? this.category.title : '';

    if (this.currentAction === 'new') {
      this.pageTitle = 'Nova Categoria';
    } else {
      this.pageTitle= `Atualizar Categoria: ${title}`;
    }
  }

  private storeCategory(): void {
    const category: Category = Object.assign(new Category(), this.categoryForm.value);

    this.categoriesService.store(category).subscribe((category: Category) => {
      this.categoryForm.reset();
      this.successActions(category);
    });
  }

  private updateCategory(): void {
    const category: Category = Object.assign(new Category(), this.categoryForm.value);

    this.categoriesService.update(category).subscribe((category: Category) => {
      this.categoryForm.reset();
      this.successActions(category);
    });
  }

  private successActions(category: Category): void {
    this.submitting = false;
    this.messageService.add({...this.TOAST, detail: `Categoria ${category.title} salva com sucesso!`});
    this.router.navigate(['categories']);
  }

}
