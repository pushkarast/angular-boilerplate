import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MngCustomersComponent } from './mng-customers.component';

describe('MngCustomersComponent', () => {
  let component: MngCustomersComponent;
  let fixture: ComponentFixture<MngCustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MngCustomersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MngCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
