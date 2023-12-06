import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnBoardAstrologerComponent } from './on-board-astrologer.component';

describe('OnBoardAstrologerComponent', () => {
  let component: OnBoardAstrologerComponent;
  let fixture: ComponentFixture<OnBoardAstrologerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnBoardAstrologerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnBoardAstrologerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
