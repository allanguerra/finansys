import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { IMaskModule } from 'angular-imask';

import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { InputErrorComponent } from './components/input-error/input-error.component';

@NgModule({
  declarations: [
    BreadcrumbComponent,
    PageHeaderComponent,
    InputErrorComponent
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
    PageHeaderComponent,
    InputErrorComponent
  ]
})
export class SharedModule { }
