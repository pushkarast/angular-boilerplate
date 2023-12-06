import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AstrosettingComponent } from './astrosetting.component';

describe('AstrosettingComponent', () => {
  let component: AstrosettingComponent;
  let fixture: ComponentFixture<AstrosettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AstrosettingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AstrosettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
