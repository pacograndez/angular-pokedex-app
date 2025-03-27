import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { PokedexService } from './commons/services';
import { IPokemonBase } from './commons/interfaces';
import { PokemonCardComponent } from './commons/components';

@Component({
  selector: 'pk-pokedex',
  standalone: true,
  imports: [PokemonCardComponent, NgFor, NgIf],
  templateUrl: './pokedex.component.html',
  styles: []
})
export class PokedexComponent implements OnInit {
  public dataList: IPokemonBase[];
  public currentList: IPokemonBase[];

  public constructor(private readonly pokedexService: PokedexService) {
    this.dataList = [];
    this.currentList = [];
  }

  public ngOnInit(): void {
    this.getPokemonList();
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
          this.currentList = this.dataList;
        }
      });
    });
    // this.currentList = this.dataList;
  }
}
