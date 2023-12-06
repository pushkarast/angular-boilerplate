import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerCustomRechComponent } from './customer-custom-rech.component';

describe('CustomerCustomRechComponent', () => {
  let component: CustomerCustomRechComponent;
  let fixture: ComponentFixture<CustomerCustomRechComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerCustomRechComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerCustomRechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
