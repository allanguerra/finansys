import { Component, OnInit } from '@angular/core';

import { EntriesService } from '../../services/entries-service/entries.service';
import { Entry } from 'src/app/shared/models/entry.model';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.scss']
})
export class EntryListComponent implements OnInit {

  public entries: Entry[] = [];

  constructor(
    private entriesService: EntriesService
  ) { }

  ngOnInit() {
    this.getEntries();
  }

  public remove(id: number): void {
    if(confirm('Deseja excluir este item?')) {
      this.entriesService.remove(id).subscribe(_ => {
        this.getEntries();
      });
    }
  }

  private getEntries(): void {
    this.entriesService.getAll().subscribe((entries: Entry[]) => {
      entries
        .sort((a, b) => b.id - a.id)
        .forEach((entry: Entry) => this.entries.push(Object.assign(new Entry(), entry)));
    });
  }

}
