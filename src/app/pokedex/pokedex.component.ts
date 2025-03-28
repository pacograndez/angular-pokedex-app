import { Component, HostListener, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { PokedexService } from './commons/services';
import { IPokemonBase } from './commons/interfaces';
import { PokemonCardComponent } from './commons/components';
import { PokedexPresenter } from './pokedex.presenter';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'pk-pokedex',
  standalone: true,
  imports: [PokemonCardComponent, NgFor, NgIf, ReactiveFormsModule],
  templateUrl: './pokedex.component.html',
  styles: [],
  providers: [PokedexPresenter]
})
export class PokedexComponent implements OnInit {
  public dataList: IPokemonBase[];
  public dataFilter: IPokemonBase[];
  public currentList: IPokemonBase[];

  private pokemonToShow: number;
  private maxIndex: number;

  public constructor(
    private readonly pokedexService: PokedexService,
    public readonly pokedexPresenter: PokedexPresenter
  ) {
    this.dataList = [];
    this.dataFilter = [];
    this.currentList = [];
    this.pokemonToShow = 0;
    this.maxIndex = 14;
  }

  public ngOnInit(): void {
    this.getPokemonList();
    this.listenNameChanges();
  }

  private getPokemonList(): void {
    this.pokedexService.getPokemonList().subscribe((res) => {
      this.dataList = res;
      this.getAllTypes();
    });
  }

  private getAllTypes(): void {
    this.pokedexService.getTypes().subscribe((res) => {
      let completedCount = 0;
      const totalTypes = res.length;

      res.forEach((type) => {
        type.pokemon.forEach((item) => {
          const pokemonIndex = this.dataList.findIndex((p) => p.name === item.name);

          if (pokemonIndex !== -1) {
            this.dataList[pokemonIndex].types.push({
              name: type.name,
              slot: type.slot[pokemonIndex]
            });
            this.dataList[pokemonIndex].types.sort((a, b) => a.slot - b.slot);
          }
        });
        completedCount++;

        if (completedCount === totalTypes) {
          this.dataFilter = [...this.dataList];
          this.updateCurrentList();
        }
      });
    });
  }

  private listenNameChanges(): void {
    this.pokedexPresenter.filter$.subscribe((v) => {
      this.dataFilter = this.dataList.filter((item) => item.name.replaceAll('-', '').includes(v.trim()));
      this.maxIndex = 0;
      this.increaseMaxIndex(15);
      this.updateCurrentList();
    });
  }

  @HostListener('window:scroll', ['$event'])
  public onWindowScroll(): void {
    this.addPokemonToListAfterScroll();
  }

  private updateCurrentList(): void {
    this.currentList = this.dataFilter.slice(this.pokemonToShow, this.maxIndex);
  }

  private addPokemonToListAfterScroll(): void {
    const scrollY: number = window.scrollY;
    const scrollHeight: number = document.documentElement.scrollHeight;
    const clientHeight: number = document.documentElement.clientHeight;

    if (scrollY + 100 >= scrollHeight - clientHeight) {
      this.increaseMaxIndex(15);
      this.updateCurrentList();
    }
  }

  private increaseMaxIndex(increase: number): void {
    if (this.maxIndex + increase <= this.dataList.length) {
      this.maxIndex += increase;
    } else {
      this.maxIndex = this.dataList.length - 1;
    }
  }
}
