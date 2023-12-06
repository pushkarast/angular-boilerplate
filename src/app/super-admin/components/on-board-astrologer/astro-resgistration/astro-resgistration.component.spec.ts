import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AstroResgistrationComponent } from './astro-resgistration.component';

describe('AstroResgistrationComponent', () => {
  let component: AstroResgistrationComponent;
  let fixture: ComponentFixture<AstroResgistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AstroResgistrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AstroResgistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
