import { Component, OnInit, Input } from '@angular/core';
import { BreadcrumbItem } from './breadcrumb.type';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

  @Input()
  public items: BreadcrumbItem[];

  constructor() { }

  ngOnInit() {
  }

  public isLast(item: BreadcrumbItem): boolean {
    return this.items.indexOf(item) + 1 === this.items.length;
  }

}
