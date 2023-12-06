import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomRechargeComponent } from './custom-recharge.component';

describe('CustomRechargeComponent', () => {
  let component: CustomRechargeComponent;
  let fixture: ComponentFixture<CustomRechargeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomRechargeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomRechargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
