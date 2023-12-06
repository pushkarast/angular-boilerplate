import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewScratchCardsStatusComponent } from './view-scratch-cards-status.component';

describe('ViewScratchCardsStatusComponent', () => {
  let component: ViewScratchCardsStatusComponent;
  let fixture: ComponentFixture<ViewScratchCardsStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewScratchCardsStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewScratchCardsStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
