import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokedexContainer } from '../pokedex.container';

describe('PokedexComponent', () => {
  let component: PokedexContainer;
  let fixture: ComponentFixture<PokedexContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PokedexContainer],
    }).compileComponents();

    fixture = TestBed.createComponent(PokedexContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
