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
    this.keycloakService.logout();
  }


  isLoggedIn() {
    // console.log(1);
    // let loggedIn = await this.keycloakService.isLoggedIn();
    // console.log(2);
    return false;
  }
}
