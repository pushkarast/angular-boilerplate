import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechSupportvidComponent } from './tech-supportvid.component';

describe('TechSupportvidComponent', () => {
  let component: TechSupportvidComponent;
  let fixture: ComponentFixture<TechSupportvidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechSupportvidComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechSupportvidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
