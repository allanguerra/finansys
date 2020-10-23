import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-error',
  template: `
    <p class="text-danger">
      {{errorMessage}}
    </p>
  `,
  styleUrls: ['./input-error.component.scss']
})
export class InputErrorComponent implements OnInit {

  @Input()
  public formControl: FormControl

  constructor() { }

  ngOnInit() {
  }

  // PUBLIC METHODS

  public get errorMessage(): string | null {
    if (this.showErrorMessage()) {
      return this.getMessage();
    }
    return null;
  }

  // PRIVATE METHODS

  private showErrorMessage(): boolean {

    return this.formControl.invalid && this.formControl.touched;
  }

  private getMessage(): string | null {
    if (this.formControl.errors.required) {
      return 'campo obrigatório';
    } else if (this.formControl.errors.minlength) {
      return `mínimo de ${this.formControl.errors.minlength.requiredLength} caracteres`
    }
    return null;

  }

}
