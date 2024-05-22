import { Component, Input } from '@angular/core';

@Component({
  selector: 'pk-pokedex-ui',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss'],
})
export class PokedexComponent {
  @Input() public isLoading!: boolean | null;
}
