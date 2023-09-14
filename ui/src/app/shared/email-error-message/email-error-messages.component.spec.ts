import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailErrorMessagesComponent } from './email-error-messages.component';

describe('EmailErrorMessageComponent', () => {
  let component: EmailErrorMessagesComponent;
  let fixture: ComponentFixture<EmailErrorMessagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmailErrorMessagesComponent]
    });
    fixture = TestBed.createComponent(EmailErrorMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
