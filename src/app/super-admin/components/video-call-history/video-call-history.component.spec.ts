import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoCallHistoryComponent } from './video-call-history.component';

describe('VideoCallHistoryComponent', () => {
  let component: VideoCallHistoryComponent;
  let fixture: ComponentFixture<VideoCallHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoCallHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoCallHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
