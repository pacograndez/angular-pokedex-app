import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable, Subject, startWith } from 'rxjs';

@Injectable()
export class PokedexTablePresenter {
  public form!: FormGroup;
  public name!: FormControl<string | null>;

  public filter: Subject<string>;
  public filter$: Observable<string>;

  public constructor(private readonly fb: FormBuilder) {
    this.initialControlsAndValidators();
    this.initForm();
    this.filter = new Subject<string>();
    this.filter$ = this.filter.asObservable();
    this.listenNameChanges();
  }

  private initialControlsAndValidators(): void {
    this.name = new FormControl<string | null>(null);
  }
  private initForm(): void {
    this.form = this.fb.group({
      name: this.name,
    });
  }

  private listenNameChanges(): void {
    this.name.valueChanges.subscribe((v) => {
      this.filter.next(v || '');
    });
  }
}
