import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { EntriesRoutingModule } from './entries-routing.module';
import { CalendarModule } from 'primeng/calendar';
import { IMaskModule } from 'angular-imask';


import { EntryListComponent } from './components/entry-list/entry-list.component';
import { EntryFormComponent } from './components/entry-form/entry-form.component';


@NgModule({
  declarations: [EntryListComponent, EntryFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CalendarModule,
    IMaskModule,
    EntriesRoutingModule
  ]
})
export class EntriesModule { }
