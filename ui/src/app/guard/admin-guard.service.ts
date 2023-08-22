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
    if (await this.isAdmin()) {
      return true;
    }
    this.showToast('You are not allowed to see this page');
    return false;
  }

  private async isAdmin() {
    const user = await this.oktaAuth.getUser();
    const groups = <string[]>user['groups'];
    return groups.includes('Admins');
  }

  private showToast(message: string) {
    this.toastService.showToast(true, message, 'error');
  }
}
