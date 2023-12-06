import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageShopServiceComponent } from './manage-shop-service.component';

describe('ManageShopServiceComponent', () => {
  let component: ManageShopServiceComponent;
  let fixture: ComponentFixture<ManageShopServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageShopServiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageShopServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
