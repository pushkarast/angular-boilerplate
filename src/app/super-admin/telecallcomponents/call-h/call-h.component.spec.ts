import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallHComponent } from './call-h.component';

describe('CallHComponent', () => {
  let component: CallHComponent;
  let fixture: ComponentFixture<CallHComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CallHComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CallHComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
