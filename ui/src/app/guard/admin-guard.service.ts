import { Inject, Injectable } from '@angular/core';
import { OKTA_AUTH } from '@okta/okta-angular';
import OktaAuth from '@okta/okta-auth-js';
import { ToastService } from '../shared/toast.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard {
  constructor(
    @Inject(OKTA_AUTH) private oktaAuth: OktaAuth,
    private toastService: ToastService,
  ) {}

  async canActivate() {
    const isAuthenticated = await this.oktaAuth.isAuthenticated();
    if (!isAuthenticated) {
      this.toastService.showToast(
        true,
        'Please, authorize to see this page',
        'error',
      );
      return false;
    }

    const user = await this.oktaAuth.getUser();
    const groups = <string[]>user['groups'];
    if (groups.includes('Admins')) {
      return true;
    }

    this.toastService.showToast(
      true,
      'You are not allowed to see this page',
      'error',
    );
    return false;
  }
}
