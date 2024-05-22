import { Component } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Component({
  selector: 'pk-pokedex',
  templateUrl: './pokedex.container.html',
})
export class PokedexContainer {
  private isLoading: BehaviorSubject<boolean>;
  public isLoading$: Observable<boolean>;

  public constructor() {
    this.isLoading = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoading.asObservable();
  }
}
