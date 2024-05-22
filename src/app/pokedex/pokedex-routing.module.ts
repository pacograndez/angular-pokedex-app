import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokedexContainer } from './pokedex.container';

const routes: Routes = [{ path: '', component: PokedexContainer }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PokedexRoutingModule {}
