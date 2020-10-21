import { BaseModel } from './base.model';

export class Category extends BaseModel {
  constructor(
    public id?: number,
    public title?: string,
    public description?: string
  ) {
    super();
  }

  static fromData(data: any): Category {
    return Object.assign(new Category(), data);
  }
}
