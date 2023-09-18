import { Component, Input } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-password-error-messages',
  templateUrl: './password-error-messages.component.html',
  styleUrls: ['./password-error-messages.component.scss']
})
export class PasswordErrorMessagesComponent {
  @Input({ required: true }) password!: NgModel;
}
