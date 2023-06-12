import {Component} from '@angular/core';
import {User} from "../shared/user.model";
import {SignUpService} from "./sign-up.service";
import {Message, MessageService} from "primeng/api";
import {Status} from '../shared/status.enum';
import {Pending} from "../shared/pending.interface";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  user: User = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  };
  errorMessages: Message[] = [];
  readonly Status = Status;
  response!: Pending<void>;

  constructor(private signUpService: SignUpService,
              private messageService: MessageService,
              private router: Router) {
  }

  onSubmit() {
    this.response = this.signUpService.register(this.user);
    this.response.data.subscribe({
      error: err =>
        this.errorMessages =
          err.error.messages.map((message: string) => ({
            severity: 'error',
            summary: 'Error',
            detail: message
          })),
      complete: () => {
        this.showToast();
        this.router.navigate(['/']);
      }
    });

  }

  showToast() {
    this.messageService.add({
        closable: true,
        severity: 'success',
        summary: 'Success',
        detail: 'You have successfully signed up'
      }
    );
  }
}
