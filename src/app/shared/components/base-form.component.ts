import { OnInit, AfterContentChecked, Injector } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { switchMap } from 'rxjs/operators';

import { MessageService } from 'primeng/api';
import { BaseService } from '../services/base.service';

import { BaseModel } from '../models/base.model';

export abstract class BaseFormComponent<T extends BaseModel> implements OnInit, AfterContentChecked {

  public modelForm: FormGroup;
  public pageTitle: string;
  public errorMessage: string;
  public submitting: boolean = false;

  protected readonly TOAST = {severity: 'success', summary: 'Sucesso'};
  protected currentAction: string;

  protected route: ActivatedRoute;
  protected router: Router;
  protected fb: FormBuilder;
  protected messageService: MessageService

  constructor(
    public model: T,
    protected injector: Injector,
    protected baseService: BaseService<T>,
    protected dataToModelFn: (data: any) => T
  ) {
    this.route = injector.get(ActivatedRoute);
    this.router = injector.get(Router);
    this.fb = injector.get(FormBuilder);
    this.messageService = injector.get(MessageService);
  }

  ngOnInit() {
    this.setCurrentAction();
    this.buildModelForm();
    this.loadModel();
  }

  ngAfterContentChecked() {
    this.setPageTitle();
  }

  // PUBLIC METHODS

  public submit(): void {
    this.submitting = true;
    if (this.currentAction === 'new') {
      this.storeModel();
    } else {
      this.updateModel();
    }
  }

  // PROTECTED METHODS

  protected setCurrentAction(): void {
    if (this.route.snapshot.url[0].path === 'new') {
      this.currentAction = 'new';
    } else {
      this.currentAction = 'edit';
    }
  }

  protected loadModel(): void {
    if (this.currentAction === 'edit') {
      this.route.paramMap.pipe(
        switchMap(params => this.baseService.getById(+params.get('id')))
      ).subscribe((model: T) => {
        this.model = model;
        this.modelForm.patchValue(model);
      });
    }
  }

  protected setPageTitle(): void {
    if (this.currentAction === 'new') {
      this.pageTitle = this.setNewPageTitle();
    } else {
      this.pageTitle= this.setEditPageTitle();
    }
  }

  protected storeModel(): void {
    const model: T = this.dataToModelFn(this.modelForm.value);

    this.baseService.store(model).subscribe((model: T) => {
      this.modelForm.reset();
      this.successActions(model);
    });
  }

  protected updateModel(): void {
    const model: T = this.dataToModelFn(this.modelForm.value);

    this.baseService.update(model).subscribe((model: T) => {
      this.modelForm.reset();
      this.successActions(model);
    });
  }

  protected successActions(model: T): void {
    const parentRoute = this.route.snapshot.parent.url[0].path;
    const detail = this.setMessage();

    this.submitting = false;
    this.messageService.add({...this.TOAST, detail});
    this.router.navigate([parentRoute]);
  }

  protected setNewPageTitle(): string {
    return 'Novo';
  }

  protected setEditPageTitle(): string {
    return 'Atualizar';
  }

  protected setMessage(): string {
    return 'Solicitação salva com sucesso!';
  }

  // ABSTRACT METHODS

  protected abstract buildModelForm(): void;

}
