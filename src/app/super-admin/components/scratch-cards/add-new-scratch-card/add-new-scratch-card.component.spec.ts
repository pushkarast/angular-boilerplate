import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewScratchCardComponent } from './add-new-scratch-card.component';

describe('AddNewScratchCardComponent', () => {
  let component: AddNewScratchCardComponent;
  let fixture: ComponentFixture<AddNewScratchCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewScratchCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewScratchCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
