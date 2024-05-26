import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  IBase,
  IPageChanged,
  IPagination,
  IPokemon,
} from '@commons/interfaces';

@Component({
  selector: 'pk-pokedex-ui',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss'],
})
export class PokedexComponent implements OnChanges {
  @Input() public isLoading!: boolean | null;
  @Input() public dataList!: IPagination<IBase> | null;

  @Output() public filter: EventEmitter<string>;

  public totalItems: number;
  public listPokemos: Array<IBase>;
  public listNames: Array<string>;
  public filterNames: Array<IBase>;
  public hasFilter: boolean;
  public selectedPokemon: IPokemon;

  public constructor() {
    this.totalItems = 0;
    this.listPokemos = new Array<IBase>();
    this.listNames = new Array<string>();
    this.filterNames = new Array<IBase>();
    this.filter = new EventEmitter<string>();
    this.hasFilter = false;
    this.selectedPokemon = {} as IPokemon;
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataList'].currentValue) {
      this.totalItems = this.dataList?.totalItems as number;
      this.dataList?.results.map((r) =>
        this.listNames.push(
          r.name[0].toUpperCase() + r.name.slice(1).toLowerCase()
        )
      );
      const list = this.dataList?.results.slice(0, 6) as Array<IBase>;
      this.listPokemos = list;
    }
  }

  public onFilterPokemon(event: string): void {
    if (event) {
      this.filterNames = this.dataList?.results.filter((r) =>
        r.name.toLowerCase().includes(event.toLowerCase())
      ) as [];
      this.totalItems = this.filterNames?.length;
      this.listPokemos = this.filterNames?.slice(0, 6) as Array<IBase>;
    } else {
      this.totalItems = this.dataList?.totalItems as number;
      const list = this.dataList?.results.slice(0, 6) as Array<IBase>;
      this.listPokemos = list;
    }
  }

  public onPageChanged(event: IPageChanged): void {
    if (this.hasFilter) {
      this.listPokemos = this.filterNames.slice(event.startItem, event.endItem);
    } else {
      const list = this.dataList?.results.slice(
        event.startItem,
        event.endItem
      ) as Array<IBase>;
      this.listPokemos = list;
    }
  }
}
