import { Component, Inject } from '@angular/core';
import OktaAuth, { UserClaims } from '@okta/okta-auth-js';
import { OKTA_AUTH } from '@okta/okta-angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  user!: UserClaims;

  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth) {
  }

  async ngOnInit() {
    this.user = await this.oktaAuth.getUser();
  }
}
