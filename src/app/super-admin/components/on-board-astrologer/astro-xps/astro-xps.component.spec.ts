import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AstroXpsComponent } from './astro-xps.component';

describe('AstroXpsComponent', () => {
  let component: AstroXpsComponent;
  let fixture: ComponentFixture<AstroXpsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AstroXpsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AstroXpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
