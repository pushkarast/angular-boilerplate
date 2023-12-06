import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScratchCardsComponent } from './scratch-cards.component';

describe('ScratchCardsComponent', () => {
  let component: ScratchCardsComponent;
  let fixture: ComponentFixture<ScratchCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScratchCardsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScratchCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
