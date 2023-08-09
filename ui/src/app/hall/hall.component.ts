import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HallService } from './hall.service';
import { firstValueFrom } from 'rxjs';
import { SessionBuyTicketDto } from './session-buy-ticket.dto';
import { Ticket } from './models/ticket.model';
import { OktaAuthStateService } from '@okta/okta-angular';
import { TicketService } from './ticket.service';
import { ToastService } from '../shared/toast.service';
import { addMinutes } from 'date-fns';
import { isEqual } from 'lodash';

@Component({
  selector: 'app-hall',
  templateUrl: './hall.component.html',
  styleUrls: ['./hall.component.scss'],
  providers: [TicketService],
})
export class HallComponent implements OnInit {
  session!: SessionBuyTicketDto;
  sessionId!: string;
  tickets!: Ticket[];
  isAuthenticated: boolean | undefined;

  protected addMinutes = addMinutes;
  @ViewChild('purchaseButton') purchaseButtonElementRef!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private hallService: HallService,
    private ticketService: TicketService,
    private toastService: ToastService,
    private oktaStateService: OktaAuthStateService,
  ) {}

  async ngOnInit() {
    this.tickets = this.ticketService.tickets;
    const params = await firstValueFrom(this.route.params);
    this.sessionId = params['sessionId'];
    this.session = await firstValueFrom(
      this.hallService.getSession(this.sessionId).data,
    );
    this.isAuthenticated = (
      await firstValueFrom(this.oktaStateService.authState$)
    ).isAuthenticated;
  }

  isSeatTaken(row: number, seat: number) {
    return !!this.session.boughtTickets.find(
      (ticket) => ticket.row === row && ticket.seat === seat,
    );
  }

  getTotalPrice() {
    return this.ticketService.getTotalPrice();
  }

  async onPurchaseTickets() {
    this.purchaseButtonElementRef.nativeElement.disabled = true;
    this.isAuthenticated &&
      this.hallService
        .purchaseTickets(this.tickets, this.sessionId)
        .data.subscribe({
          next: (value) => this.handleSuccess(),
          error: this.handleError,
        });
  }

  private handleSuccess() {
    this.toastService.showToast(
      false,
      'success',
      'Our cats get their tickets for free! Enjoy the film =)',
    );
    this.reloadCurrentRoute();
  }

  private handleError(err: any) {
    this.toastService.showToast(
      false,
      'error',
      "Ooops... Something went wrong but don't worry, Andromeda is on the way :)",
    );
    console.error(err);
  }

  private reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate([currentUrl]));
  }

  async onSelectSeat(btnSeat: HTMLButtonElement) {
    const dataset = btnSeat.dataset;
    const selectedRow = +dataset['row']!;
    const selectedSeat = +dataset['seat']!;
    if (this.isSeatTaken(selectedRow, selectedSeat)) return;

    this.toggleSeatSelected(btnSeat);
    const ticket = new Ticket(
      selectedRow,
      selectedSeat,
      dataset['type'],
      +dataset['price']!,
    );
    const foundedIndex = this.tickets.findIndex((value) =>
      isEqual(value, ticket),
    );
    const isTicketSelected = foundedIndex !== -1;
    isTicketSelected
      ? this.ticketService.removeByIndex(foundedIndex)
      : this.ticketService.add(ticket);
  }

  private toggleSeatSelected(btnSeat: HTMLButtonElement) {
    const seatType = btnSeat.classList.contains('hall__seat--good')
      ? 'good'
      : 'lux';
    btnSeat.classList.toggle(`hall__seat--selected-${seatType}`);
  }
}
