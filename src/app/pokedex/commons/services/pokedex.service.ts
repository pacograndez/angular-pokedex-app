import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { IPokemon, IPagination } from '../interfaces';
import { ENVIRONMENT } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PokedexService {
  constructor(private httpClient: HttpClient) {}

  getAllPokemonList(): Observable<IPagination<IPokemon>> {
    return this.httpClient.get<any>(`${ENVIRONMENT.apiUrl}?limit=1302`).pipe(
      map((res) => ({
        totalItems: res.count,
        results: res.results,
      }))
    );
  }

  getPokemonDetail(name: string): Observable<IPokemon> {
    return this.httpClient.get<any>(`${ENVIRONMENT.apiUrl}/${name}`).pipe(
      map((res) => ({
        id: res.id,
        name: res.name,
        abilities: res.abilities,
        baseExperience: res.base_experience,
        locationAreaEncounters: res.location_area_encounters,
        cries: res.cries,
        height: res.height,
        weight: res.weight,
        types: res.types,
        stats: res.stats,
        image: res.sprites.other['dream_world']['front_default'],
      }))
    );
  }
}
