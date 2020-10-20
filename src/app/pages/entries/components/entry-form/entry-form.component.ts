import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { switchMap } from 'rxjs/operators';

import { MessageService } from 'primeng/api';
import { EntriesService } from '../../services/entries-service/entries.service';
import { Entry } from 'src/app/models/entry.model';

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.scss']
})
export class EntryFormComponent implements OnInit, AfterContentChecked {

  public entryForm: FormGroup;
  public pageTitle: string;
  public errorMessage: string;
  public submitting: boolean = false;

  public entry: Entry;

  private currentAction: string;

  private readonly TOAST = {severity: 'success', summary: 'Sucesso'};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private entriesService: EntriesService,
    private messageService: MessageService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.setCurrentAction();
    this.buildEntryForm();
    this.loadEntry();
  }

  ngAfterContentChecked() {
    this.setPageTitle();
  }

  // PUBLIC METHODS

  public submit(): void {
    this.submitting = true;
    if (this.currentAction === 'new') {
      this.storeEntry();
    } else {
      this.updateEntry();
    }
  }

  // PRIVATE METHODS

  private setCurrentAction(): void {
    if (this.route.snapshot.url[0].path === 'new') {
      this.currentAction = 'new';
    } else {
      this.currentAction = 'edit';
    }
  }

  private buildEntryForm(): void {
    this.entryForm = this.fb.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(3)]],
      description: [null]
    });
  }

  private loadEntry(): void {
    if (this.currentAction === 'edit') {
      this.route.paramMap.pipe(
        switchMap(params => this.entriesService.getById(+params.get('id')))
      ).subscribe((entry: Entry) => {
        this.entry = entry;
        this.entryForm.patchValue(entry);
      });
    }
  }

  private setPageTitle(): void {
    const name = this.entry ? this.entry.name : '';

    if (this.currentAction === 'new') {
      this.pageTitle = 'Nova Categoria';
    } else {
      this.pageTitle= `Atualizar Categoria: ${name}`;
    }
  }

  private storeEntry(): void {
    const entry: Entry = Object.assign(new Entry(), this.entryForm.value);

    this.entriesService.store(entry).subscribe((entry: Entry) => {
      this.entryForm.reset();
      this.successActions(entry);
    });
  }

  private updateEntry(): void {
    const entry: Entry = Object.assign(new Entry(), this.entryForm.value);

    this.entriesService.update(entry).subscribe((entry: Entry) => {
      this.entryForm.reset();
      this.successActions(entry);
    });
  }

  private successActions(entry: Entry): void {
    this.submitting = false;
    this.messageService.add({...this.TOAST, detail: `Categoria ${entry.name} salva com sucesso!`});
    this.router.navigate(['entries']);
  }

}
