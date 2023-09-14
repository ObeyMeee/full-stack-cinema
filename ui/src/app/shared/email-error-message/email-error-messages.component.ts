import { Component, Input } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-email-error-messages',
  templateUrl: './email-error-messages.component.html',
  styleUrls: ['./email-error-messages.component.scss']
})
export class EmailErrorMessagesComponent {
  @Input({required: true}) email!: NgModel;
}
