export interface IPokemonBase {
  id: number;
  name: string;
  types: { name: string; slot: number }[];
}

export interface ITypeDetails {
  name: string;
  pokemon: IPokemonBase[];
  slot: number[];
}
