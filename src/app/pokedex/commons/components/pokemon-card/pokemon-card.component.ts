import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgClass, NgFor, TitleCasePipe } from '@angular/common';
import { IPokemonBase } from '../../interfaces';
import { ZeroPadPipe } from '../../pipes';

@Component({
  selector: 'pk-pokemon-card',
  standalone: true,
  imports: [TitleCasePipe, ZeroPadPipe, NgClass, NgFor],
  templateUrl: './pokemon-card.component.html',
  styles: []
})
export class PokemonCardComponent implements OnChanges {
  @Input() pokemon!: IPokemonBase;
  public cardTypeClass: string;

  public constructor() {
    this.cardTypeClass = '';
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['pokemon'] && this.pokemon) {
      this.setCardTypeClass();
    }
  }

  public get pokemonAvatar() {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.pokemon.id}.png`;
  }

  public getBadgeTypeColor(type: string): string {
    return `bg-${type}`;
  }

  private setCardTypeClass(): void {
    this.cardTypeClass = `bg-gradient-to-b from-white to-${this.pokemon.types[0].name.toLowerCase()} hover:shadow-${this.pokemon.types[0].name.toLowerCase()}`;
  }
}
