import { Component, OnInit, AfterContentChecked, Injector } from '@angular/core';
import { BaseFormComponent } from 'src/app/shared/components/base-form.component';

import { Validators } from '@angular/forms';

import { EntriesService } from '../../services/entries-service/entries.service';
import { CategoriesService } from 'src/app/pages/categories/services/categories-service/categories.service';

import { Entry } from 'src/app/shared/models/entry.model';
import { Category } from 'src/app/shared/models/category.model';

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.scss']
})
export class EntryFormComponent extends BaseFormComponent<Entry> implements OnInit {

  public categories: Category[];

  public readonly MASK = { mask: Number, scale: 2, thousandsSeparator: '.', padFractionalZeros: true, NormalizeZeros: true, radix: ',' };

  constructor(
    protected injector: Injector,
    protected entriesService: EntriesService,
    protected categoriesService: CategoriesService
  ) {
    super(
      new Entry(),
      injector,
      entriesService,
      Entry.fromData
    );
  }

  ngOnInit() {
    super.ngOnInit();
    this.loadCategories();
  }

  // PUBLIC METHODS

  public submit(): void {
    this.modelForm.get('amount').setValue(this.modelForm.get('amount').value.replace('.','').replace(',','.'));
    super.submit();
  }

  public setPaid(paid: boolean): void {
    this.modelForm.get('paid').setValue(paid);
  }

  public get typeOptions(): Array<any> {
    return Object.entries(Entry.types)
      .map(([value, text]) => {
        return {
          value,
          text
        }
      });
  }

  // PROTECTED METHODS

  protected buildModelForm(): void {
    this.modelForm = this.fb.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(3)]],
      description: [null],
      type: [null, Validators.required],
      amount: [null, Validators.required],
      date: [null, Validators.required],
      paid: [false, Validators.required],
      categoryId: [null, Validators.required]
    });
  }

  protected loadCategories(): void {
    this.categoriesService.getAll().subscribe((categories: Category[]) => {
      this.categories = categories;
    });
  }

  protected setNewPageTitle(): string {
    return 'Novo Lançamento';
  }

  protected setEditPageTitle(): string {
    return `Atualizar Lançamento: ${this.model.name}`;
  }

  protected setMessage(): string {
    return 'Lançamento salvo com sucesso!';
  }

}
