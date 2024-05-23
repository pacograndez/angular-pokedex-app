import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'pk-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokedex-table.component.html',
  styleUrls: ['./pokedex-table.component.scss'],
})
export class PokedexTableComponent implements OnChanges {
  @Input() public isLoading!: boolean | null;

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.isLoading);
  }
}
