import { Component } from '@angular/core';
import { BaseListComponent } from 'src/app/shared/components/base-list.component';

import { EntriesService } from '../../services/entries-service/entries.service';
import { Entry } from 'src/app/shared/models/entry.model';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.scss']
})
export class EntryListComponent extends BaseListComponent<Entry> {

  constructor(
    protected entriesService: EntriesService
  ) {
    super(entriesService);
  }

}
