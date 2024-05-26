export interface IBase {
  name: string;
  url: string;
}

export interface IPokemon {
  id: string;
  name: string;
  abilities: IAbilitie[];
  baseExperience: string;
  locationAreaEncounters: string;
  cries: ICries;
  height: string;
  weight: string;
  types: IType[];
  stats: IStats[];
  image: string;
}

export interface IAbilitie {
  ability: IBase;
  isHidden: boolean;
  slot: number;
}

export interface ICries {
  latest: string;
  legacy: string;
}

export interface IType {
  id: string;
  name: string;
}

export interface IStats {
  baseStat: number;
  effort: number;
  stat: IBase;
}

export interface IPagination<T> {
  totalItems: number;
  results: Array<T>;
}

export interface IPageChanged {
  page: number;
  startItem: number;
  endItem: number;
}
