import { Category } from './category.model';
import { BaseModel } from './base.model';

export class Entry extends BaseModel {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string,
    public type?: string,
    public amount?: string,
    public date?: string,
    public paid?: boolean,
    public categoryId?: number,
    public category?: Category
  ) {
    super();
  }

  get paidText(): string {
    return this.paid ? 'Pago' : 'Pendente';
  }

  static types = {
    expense: 'Despesa',
    revenue: 'Receita'
  }

  static fromData(data: any): Entry {
    return Object.assign(new Entry(), data);
  }
}
