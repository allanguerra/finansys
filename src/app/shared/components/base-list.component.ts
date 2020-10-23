import { OnInit } from '@angular/core';

import { BaseService } from '../services/base.service';
import { BaseModel } from '../models/base.model';

export abstract class BaseListComponent<T extends BaseModel> implements OnInit {

  public modelList: T[] = [];

  constructor(
    protected baseService: BaseService<T>
  ) { }

  ngOnInit() {
    this.getModelList();
  }

  // PUBLIC METHODS

  public remove(id: number): void {
    if(confirm('Deseja excluir este item?')) {
      this.baseService.remove(id).subscribe(_ => {
        this.getModelList();
      });
    }
  }

  // PROTECTED METHODS

  protected getModelList(): void {
    this.baseService.getAll().subscribe((modelList: T[]) => {
      this.modelList = modelList;
    });
  }

}
