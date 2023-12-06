import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageServiceAstroRelationComponent } from './manage-service-astro-relation.component';

describe('ManageServiceAstroRelationComponent', () => {
  let component: ManageServiceAstroRelationComponent;
  let fixture: ComponentFixture<ManageServiceAstroRelationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageServiceAstroRelationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageServiceAstroRelationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
