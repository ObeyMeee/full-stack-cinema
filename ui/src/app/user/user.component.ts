import { Component, Inject, OnInit } from '@angular/core';
import { OKTA_AUTH } from '@okta/okta-angular';
import OktaAuth, { UserClaims } from '@okta/okta-auth-js';

@Component({
  selector: 'app-profile',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  user!: UserClaims;

  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth) {}

  async ngOnInit() {
    this.user = await this.oktaAuth.getUser();
  }
}
