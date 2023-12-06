import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScratchCardListComponent } from './scratch-card-list.component';

describe('ScratchCardListComponent', () => {
  let component: ScratchCardListComponent;
  let fixture: ComponentFixture<ScratchCardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScratchCardListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScratchCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
