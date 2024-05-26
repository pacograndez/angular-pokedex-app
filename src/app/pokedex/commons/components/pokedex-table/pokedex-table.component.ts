import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IBase, IPageChanged, IPokemon } from '@commons/interfaces';
import { PokedexService } from '@commons/services';
import { CodePokedexPipe } from '@commons/pipes';
import { PokedexTablePresenter } from './pokedex-table.presenter';
import { ReactiveFormsModule } from '@angular/forms';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { PageChangedEvent, PaginationModule } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'pk-table',
  standalone: true,
  imports: [
    CommonModule,
    CodePokedexPipe,
    ReactiveFormsModule,
    TypeaheadModule,
    PaginationModule,
  ],
  templateUrl: './pokedex-table.component.html',
  styleUrls: ['./pokedex-table.component.scss'],
  providers: [PokedexTablePresenter],
})
export class PokedexTableComponent implements OnInit, OnChanges {
  @Input() public isLoading!: boolean | null;
  @Input() public listPokemos!: Array<IBase> | null;
  @Input() public totalItems!: number;
  @Input() public listNames!: Array<string>;

  @Output() public filter: EventEmitter<string>;
  @Output() public pageChanged: EventEmitter<IPageChanged>;
  @Output() public hasFilter: EventEmitter<boolean>;
  @Output() public selectedPokemon: EventEmitter<IPokemon>;

  public dataPokemons: Array<IPokemon>;

  public constructor(
    private readonly pokedexService: PokedexService,
    public readonly pokedexTablePresenter: PokedexTablePresenter
  ) {
    this.dataPokemons = new Array<IPokemon>();
    this.filter = new EventEmitter<string>();
    this.hasFilter = new EventEmitter<boolean>();
    this.pageChanged = new EventEmitter<IPageChanged>();
    this.selectedPokemon = new EventEmitter<IPokemon>();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['listPokemos'].currentValue) {
      this.getDataPokemon(this.listPokemos as Array<IBase>);
    }
  }

  public ngOnInit(): void {
    this.onFilterPokemon();
  }

  public onPageChanged(event: PageChangedEvent): void {
    const pageChanged: IPageChanged = {
      page: event.page - 1,
      startItem: (event.page - 1) * event.itemsPerPage,
      endItem: event.page * event.itemsPerPage,
    };
    this.pageChanged.emit(pageChanged);
  }

  public getTypeColor(type: string): string {
    return `badge-color-${type}`;
  }

  public onSelectecPokemon(event: IPokemon): void {
    this.selectedPokemon.emit(event);
  }

  private onFilterPokemon(): void {
    this.pokedexTablePresenter.filter$.subscribe((v) => {
      this.filter.emit(v);
      v !== '' ? this.hasFilter.emit(true) : this.hasFilter.emit(false);
    });
  }

  private getDataPokemon(data: Array<IBase>): void {
    this.isLoading = true;
    this.dataPokemons = [];
    data.forEach((r) => {
      this.pokedexService.getPokemonDetail(r.name).subscribe((r) => {
        this.dataPokemons?.push(r);
        this.isLoading = false;
      });
    });
  }
}
