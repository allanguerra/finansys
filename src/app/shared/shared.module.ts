import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { IMaskModule } from 'angular-imask';

import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';

@NgModule({
  declarations: [
    BreadcrumbComponent,
    PageHeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    CalendarModule,
    IMaskModule
  ],
  exports: [
    // MODULES
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    CalendarModule,
    IMaskModule,
    // COMPONENTS
    BreadcrumbComponent,
    PageHeaderComponent
  ]
})
export class SharedModule { }
