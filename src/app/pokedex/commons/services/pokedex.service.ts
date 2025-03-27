import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';
import { IPokemonBase, ITypeDetails } from '../interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PokedexService {
  public constructor(private readonly http: HttpClient) {}

  public getPokemonList(): Observable<IPokemonBase[]> {
    const data: IPokemonBase[] = [];
    return this.http.get<{ results: { name: string }[] }>(`${environment.apiUrl}/pokemon?limit=1025`).pipe(
      map(({ results }) => {
        results.map((item, index: number) => {
          data.push({
            id: index + 1,
            name: item.name,
            types: []
          });
        });
        return data;
      })
    );
  }

  public getTypes(): Observable<ITypeDetails[]> {
    const types = Array.from({ length: 18 }, (_, index) => this.getType(index + 1));
    return forkJoin(types);
  }

  private getType(typeId: number): Observable<ITypeDetails> {
    return this.http
      .get<{
        name: string;
        pokemon: { pokemon: { name: string }; slot: number }[];
      }>(`${environment.apiUrl}/type/${typeId}`)
      .pipe(
        map(({ name, pokemon }) => {
          return {
            name,
            pokemon: pokemon.map((item) => item.pokemon),
            slot: pokemon.map((item) => item.slot)
          } as ITypeDetails;
        })
      );
  }
}
