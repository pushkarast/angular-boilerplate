import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AstroViewComponent } from './astro-view.component';

describe('AstroViewComponent', () => {
  let component: AstroViewComponent;
  let fixture: ComponentFixture<AstroViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AstroViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AstroViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
