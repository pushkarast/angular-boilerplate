import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AstroshopOrderHistoryComponent } from './astroshop-order-history.component';

describe('AstroshopOrderHistoryComponent', () => {
  let component: AstroshopOrderHistoryComponent;
  let fixture: ComponentFixture<AstroshopOrderHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AstroshopOrderHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AstroshopOrderHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
