import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class PokedexPresenter {
  public form!: FormGroup<{ name: FormControl }>;
  public name!: FormControl<string | null>;

  public filter$: Observable<string>;
  private filter: Subject<string>;

  public constructor(private readonly fb: FormBuilder) {
    this.initControlsAndValidators();
    this.initForm();
    this.filter = new Subject<string>();
    this.filter$ = this.filter.asObservable();
    this.listenNameChanges();
  }

  private initControlsAndValidators() {
    this.name = new FormControl(null);
  }

  private initForm() {
    this.form = this.fb.group({ name: this.name });
  }

  private listenNameChanges(): void {
    this.name.valueChanges.subscribe((v) => {
      this.filter.next(v || '');
    });
  }
}
