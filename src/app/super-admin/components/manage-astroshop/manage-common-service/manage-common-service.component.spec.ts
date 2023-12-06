import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCommonServiceComponent } from './manage-common-service.component';

describe('ManageCommonServiceComponent', () => {
  let component: ManageCommonServiceComponent;
  let fixture: ComponentFixture<ManageCommonServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageCommonServiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageCommonServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
