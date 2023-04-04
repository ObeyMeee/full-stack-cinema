import {Component} from '@angular/core';
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(public keycloakService: KeycloakService) {
  }

  onLogin() {
    this.keycloakService.login();
  }

  onLogout() {
    this.keycloakService.getKeycloakInstance().logout();
  }

  onSignup() {
    this.keycloakService.getKeycloakInstance().register();
  }

  isAuthenticated() {
    return this.keycloakService.getKeycloakInstance().authenticated;
  }
}
