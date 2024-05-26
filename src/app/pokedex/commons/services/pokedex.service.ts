import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { IBase, IPagination, IPokemon, IType } from '@commons/interfaces';
import { ENVIRONMENT } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PokedexService {
  constructor(private httpClient: HttpClient) {}

  public getAllPokemonList(): Observable<IPagination<IBase>> {
    return this.httpClient.get<any>(`${ENVIRONMENT.apiUrl}?limit=1302`).pipe(
      map((res) => ({
        totalItems: res.count,
        results: res.results,
      }))
    );
  }

  public getPokemonDetail(name: string): Observable<IPokemon> {
    return this.httpClient.get<any>(`${ENVIRONMENT.apiUrl}/${name}`).pipe(
      map((res) => ({
        id: res.id.toString(),
        name: res.name,
        abilities: res.abilities,
        baseExperience: res.base_experience,
        locationAreaEncounters: res.location_area_encounters,
        cries: res.cries,
        height: res.height,
        weight: res.weight,
        types: this.setPokemonTypes(res.types),
        stats: res.stats,
        image: res.sprites['front_default'], // .other['dream_world']['front_default'],
      }))
    );
  }

  private setPokemonTypes(arr: Array<any>): Array<IType> {
    let types: Array<IType> = [];
    arr.map((r) => {
      types.push({
        id: r.type.url.split('/')[6],
        name: r.type.name,
      });
    });
    return types;
  }
}
