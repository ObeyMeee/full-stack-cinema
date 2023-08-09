import { Component, Inject, OnInit } from '@angular/core';

import { environment } from '../../environments/environment.development';
import OktaSignIn from '@okta/okta-signin-widget';
import { OKTA_AUTH } from '@okta/okta-angular';
import OktaAuth from '@okta/okta-auth-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  private oktaSignIn!: OktaSignIn;

  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth) {}

  ngOnInit() {
    this.oktaSignIn = new OktaSignIn({
      logo: 'assets/logo.png',
      issuer: environment.okta.issuer,
      clientId: environment.okta.clientId,
      redirectUri: environment.okta.redirectUri,
      useClassicEngine: true,
      authParams: {
        pkce: environment.okta.pkce,
        scopes: environment.okta.scopes,
      },
    });
    this.oktaSignIn.remove();
    this.oktaSignIn.renderEl(
      { el: '#okta-sign-in-widget' },
      (res) => res.status === 'SUCCESS' && this.oktaAuth.signInWithRedirect(),
      console.error,
    );
  }
}
