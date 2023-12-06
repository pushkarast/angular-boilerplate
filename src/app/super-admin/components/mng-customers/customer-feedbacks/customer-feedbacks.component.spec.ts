import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerFeedbacksComponent } from './customer-feedbacks.component';

describe('CustomerFeedbacksComponent', () => {
  let component: CustomerFeedbacksComponent;
  let fixture: ComponentFixture<CustomerFeedbacksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerFeedbacksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerFeedbacksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
