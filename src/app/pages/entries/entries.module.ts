import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { EntriesRoutingModule } from './entries-routing.module';

import { EntryListComponent } from './components/entry-list/entry-list.component';
import { EntryFormComponent } from './components/entry-form/entry-form.component';

@NgModule({
  declarations: [EntryListComponent, EntryFormComponent],
  imports: [
    SharedModule,
    EntriesRoutingModule
  ]
})
export class EntriesModule { }
