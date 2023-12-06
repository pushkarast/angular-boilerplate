import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallChatVcallCountDatewiseComponent } from './call-chat-vcall-count-datewise.component';

describe('CallChatVcallCountDatewiseComponent', () => {
  let component: CallChatVcallCountDatewiseComponent;
  let fixture: ComponentFixture<CallChatVcallCountDatewiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CallChatVcallCountDatewiseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CallChatVcallCountDatewiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
