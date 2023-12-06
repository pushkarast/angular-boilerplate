import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaLoginComponent } from './sa-login.component';

describe('SaLoginComponent', () => {
  let component: SaLoginComponent;
  let fixture: ComponentFixture<SaLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
