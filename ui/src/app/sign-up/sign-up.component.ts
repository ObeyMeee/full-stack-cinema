import { Component } from '@angular/core';
import {User} from "../shared/user.model";
import {SignUpService} from "./sign-up.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  user : User = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  };

  constructor(private signUpService: SignUpService) {
  }
  onSubmit() {
    this.signUpService.register(this.user).subscribe();
  }
}
