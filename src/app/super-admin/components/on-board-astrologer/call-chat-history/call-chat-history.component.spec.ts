import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallChatHistoryComponent } from './call-chat-history.component';

describe('CallChatHistoryComponent', () => {
  let component: CallChatHistoryComponent;
  let fixture: ComponentFixture<CallChatHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CallChatHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CallChatHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
