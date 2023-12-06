import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedProductComponent } from './shared-product.component';

describe('SharedProductComponent', () => {
  let component: SharedProductComponent;
  let fixture: ComponentFixture<SharedProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharedProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
