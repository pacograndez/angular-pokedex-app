import { Component, OnInit } from '@angular/core';
import { IBase, IPagination } from '@commons/interfaces';
import { PokedexService } from '@commons/services';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'pk-pokedex',
  templateUrl: './pokedex.container.html',
})
export class PokedexContainer implements OnInit {
  private isLoading: BehaviorSubject<boolean>;
  public isLoading$: Observable<boolean>;
  public dataList$: Observable<IPagination<IBase>>;

  public constructor(private readonly pokedexService: PokedexService) {
    this.isLoading = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoading.asObservable();
    this.dataList$ = new Observable<IPagination<IBase>>();
  }

  public ngOnInit(): void {
    this.dataList$ = this.pokedexService.getAllPokemonList();
  }
}
