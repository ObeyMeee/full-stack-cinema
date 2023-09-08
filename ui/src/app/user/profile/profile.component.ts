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
  genders!: { label: string, value: string }[];

  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth) {
  }

  async ngOnInit() {
    this.genders = [
      { label: 'Male', value: 'MALE' },
      { label: 'Female', value: 'FEMALE' }
    ];
    this.user = await this.oktaAuth.getUser();
  }
}
