import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAstroshopComponent } from './manage-astroshop.component';

describe('ManageAstroshopComponent', () => {
  let component: ManageAstroshopComponent;
  let fixture: ComponentFixture<ManageAstroshopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageAstroshopComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageAstroshopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
