import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PokedexRoutingModule } from './pokedex-routing.module';
import { PokedexContainer } from './pokedex.container';
import { PokedexComponent } from './pokedex.component';
import { PokedexTableComponent } from '@commons/components';

@NgModule({
  declarations: [PokedexContainer, PokedexComponent],
  imports: [CommonModule, PokedexRoutingModule, PokedexTableComponent],
})
export class PokedexModule {}
