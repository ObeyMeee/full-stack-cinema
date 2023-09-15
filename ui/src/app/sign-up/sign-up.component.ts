import { Component } from '@angular/core';
import { SignUpService } from './sign-up.service';
import { Message } from 'primeng/api';
import { Status } from '../shared/pending/status.enum';
import { Pending } from '../shared/pending/pending.interface';
import { Router } from '@angular/router';
import { ToastService } from '../shared/toast.service';
import { UserRegisterDto } from './user-register.dto';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  user: UserRegisterDto = {
    login: '',
    email: '',
    password: '',
  };
  repeatPassword!: string;
  errorMessages: Message[] = [];
  response!: Pending<void>;
  protected readonly Status = Status;

  constructor(
    private signUpService: SignUpService,
    private toastService: ToastService,
    private router: Router,
    private socialAuthService: SocialAuthService,
  ) {}

  onSubmit() {
    this.response = this.signUpService.register(this.user);
    this.response.data.subscribe({
      complete: this.handleSuccessSignUp.bind(this),
      error: this.handleErrorSignUp.bind(this)
    });
  }

  private handleSuccessSignUp() {
    this.toastService.showToast(
      true,
      'You have successfully signed up',
      'success',
    );
    this.router.navigate(['/']);
  }

  private handleErrorSignUp(err: any) {
    console.log(err);
    this.errorMessages = err.error.messages.map((message: string) => ({
      severity: 'error',
      summary: 'Error',
      detail: message
    }));
  }

  signUpByGoogle() {
    this.socialAuthService
      .signIn(GoogleLoginProvider.PROVIDER_ID)
      .then(this.handleSuccessSignUp.bind(this))
      .catch(this.handleErrorSignUp.bind(this));
  }
}
