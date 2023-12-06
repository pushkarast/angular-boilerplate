import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AstroRegistrationComponent } from './astro-registration.component';

describe('AstroRegistrationComponent', () => {
  let component: AstroRegistrationComponent;
  let fixture: ComponentFixture<AstroRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AstroRegistrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AstroRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
