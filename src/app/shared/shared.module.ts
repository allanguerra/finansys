import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { IMaskModule } from 'angular-imask';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';

@NgModule({
  declarations: [
    BreadcrumbComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CalendarModule,
    IMaskModule
  ],
  exports: [
    // MODULES
    CommonModule,
    ReactiveFormsModule,
    CalendarModule,
    IMaskModule,
    // COMPONENTS
    BreadcrumbComponent
  ]
})
export class SharedModule { }
