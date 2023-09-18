import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordErrorMessagesComponent } from './password-error-messages.component';

describe('PasswordErrorMessagesComponent', () => {
  let component: PasswordErrorMessagesComponent;
  let fixture: ComponentFixture<PasswordErrorMessagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PasswordErrorMessagesComponent]
    });
    fixture = TestBed.createComponent(PasswordErrorMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
