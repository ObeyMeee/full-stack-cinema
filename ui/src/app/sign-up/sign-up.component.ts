import { Component } from '@angular/core';
import { User } from '../shared/user.model';
import { SignUpService } from './sign-up.service';
import { Message } from 'primeng/api';
import { Status } from '../shared/pending/status.enum';
import { Pending } from '../shared/pending/pending.interface';
import { Router } from '@angular/router';
import { ToastService } from '../shared/toast.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  user: User = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };
  errorMessages: Message[] = [];
  readonly Status = Status;
  response!: Pending<void>;

  constructor(
    private signUpService: SignUpService,
    private toastService: ToastService,
    private router: Router,
  ) {}

  onSubmit() {
    this.response = this.signUpService.register(this.user);
    this.response.data.subscribe({
      error: (err) =>
        (this.errorMessages = err.error.messages.map((message: string) => ({
          severity: 'error',
          summary: 'Error',
          detail: message,
        }))),
      complete: () => {
        this.toastService.showToast(
          true,
          'You have successfully signed up',
          'success',
        );
        this.router.navigate(['/']);
      },
    });
  }
}
