import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HallService} from "./hall.service";
import {Observable, Subscription} from "rxjs";
import {SessionBuyTicketDto} from "./session-buy-ticket.dto";
import {Ticket} from "./models/ticket.model";
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'app-hall',
  templateUrl: './hall.component.html',
  styleUrls: ['./hall.component.css']
})
export class HallComponent implements OnInit, OnDestroy {
  private routeSubscription!: Subscription;
  session$!: Observable<SessionBuyTicketDto>;
  tickets: Ticket[] = [];

  constructor(private route: ActivatedRoute,
              private hallService: HallService,
              private keycloakService: KeycloakService) {
  }

  ngOnInit() {
    this.routeSubscription = this.route.params.subscribe(params =>
      this.session$ = this.hallService.getSession(params['sessionId'])
    );
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }

  isAuthenticated() {
    return this.keycloakService.getKeycloakInstance().authenticated;
  }

  getTotalPrice() {
    return this.tickets.map(ticket => ticket.price)
      .reduce((acc, price) => acc + price, 0);
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
