import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HallService} from "./hall.service";
import {filter, map, Observable, Subscription} from "rxjs";
import {SessionBuyTicketDto} from "./session-buy-ticket.dto";
import {Ticket} from "./models/ticket.model";
import {OKTA_AUTH, OktaAuthStateService} from "@okta/okta-angular";
import OktaAuth, {AuthState} from "@okta/okta-auth-js";

@Component({
  selector: 'app-hall',
  templateUrl: './hall.component.html',
  styleUrls: ['./hall.component.css']
})
export class HallComponent implements OnInit, OnDestroy {
  private routeSubscription!: Subscription;
  session$!: Observable<SessionBuyTicketDto>;
  sessionId!: string;
  tickets: Ticket[] = [];
  isAuthenticated$!: Observable<boolean>;

  constructor(private route: ActivatedRoute,
              private hallService: HallService,
              private oktaStateService: OktaAuthStateService,
              @Inject(OKTA_AUTH) private oktaAuth: OktaAuth) {
  }

  ngOnInit() {
    this.routeSubscription = this.route.params.subscribe(params => {
        this.sessionId = params['sessionId'];
        this.session$ = this.hallService.getSession(this.sessionId);
      }
    );
    this.isAuthenticated$ = this.oktaStateService.authState$.pipe(
      filter((s: AuthState) => !!s),
      map((s: AuthState) => s.isAuthenticated ?? false)
    );
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }

  getTotalPrice() {
    return this.tickets.map(ticket => ticket.price)
      .reduce((acc, price) => acc + price, 0);
  }

  async onPurchaseTickets() {
    this.isAuthenticated$.subscribe(value =>
      value && this.hallService.purchaseTickets(this.tickets, this.sessionId)
    )
  }

  onSelectSeat(btnSeat: HTMLButtonElement) {
    this.changeSeatIcon(btnSeat);
    const dataset = btnSeat.dataset;
    const ticket = new Ticket(+dataset['row']!, +dataset['seat']!, dataset['type']!, +dataset['price']!);
    let foundedIndex = this.tickets.findIndex(value => JSON.stringify(value) === JSON.stringify(ticket));
    const isTicketSelected = foundedIndex !== -1;
    isTicketSelected ? this.removeTicket(foundedIndex) : this.add(ticket);
  }

  private changeSeatIcon(btnSeat: HTMLButtonElement) {
    const icon = btnSeat.querySelector('.bi');
    icon?.classList.toggle('bi-square');
    icon?.classList.toggle('bi-square-fill');
  }

  private add(ticket: Ticket) {
    this.tickets.push(ticket);
  }

  private removeTicket(index: number) {
    return this.tickets.splice(index, 1);
  }
}
