import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PokedexRoutingModule } from './pokedex-routing.module';
import { PokedexContainer } from './pokedex.container';
import { PokedexComponent } from './pokedex.component';

@NgModule({
  declarations: [PokedexContainer, PokedexComponent],
  imports: [CommonModule, PokedexRoutingModule],
})
export class PokedexModule {}
