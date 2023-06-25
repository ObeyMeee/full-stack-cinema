import {Component, HostListener, Inject, OnInit} from '@angular/core';
import {OKTA_AUTH, OktaAuthStateService} from "@okta/okta-angular";
import OktaAuth, {AuthState} from "@okta/okta-auth-js";
import {filter, map, Observable} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuthenticated$!: Observable<boolean>;
  innerWidth = window.screen.width;

  constructor(private oktaStateService: OktaAuthStateService,
              @Inject(OKTA_AUTH) private oktaAuth: OktaAuth) {
  }

  ngOnInit() {
    this.isAuthenticated$ = this.oktaStateService.authState$.pipe(
      filter((s: AuthState) => !!s),
      map((s: AuthState) => s.isAuthenticated ?? false)
    );
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.innerWidth = window.screen.width;
  }

  async onLogout() {
    await this.oktaAuth.signOut();
  }
}
