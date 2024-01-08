import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HallService } from './hall.service';
import { firstValueFrom, Observable } from 'rxjs';
import { SessionBuyTicketDto } from './session-buy-ticket.dto';
import { Ticket } from './models/ticket.model';
import { OktaAuthStateService } from '@okta/okta-angular';
import { TicketService } from './ticket.service';
import { ToastService } from '../shared/services/toast.service';
import { addMinutes } from 'date-fns';
import { isEqual } from 'lodash';
import { Status } from '../shared/pending/status.enum';

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
  purchaseStatus$!: Observable<Status>;

  protected addMinutes = addMinutes;
  protected readonly Status = Status;

  @ViewChild('purchaseButton') purchaseButtonElementRef!: ElementRef;
  @ViewChild('hallContainer') hallContainerElementRef!: ElementRef;

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
      (ticket) => ticket.row === row && ticket.seat === seat
    );
  }

  getTotalPrice() {
    return this.ticketService.getTotalPrice();
  }

  async onPurchaseTickets() {
    this.purchaseButtonElementRef.nativeElement.disabled = true;
    if (this.isAuthenticated) {
      const purchaseTickets = this.hallService.purchaseTickets(
        this.tickets,
        this.sessionId,
      );
      this.purchaseStatus$ = purchaseTickets.status;
      purchaseTickets.data.subscribe({
        next: this.handleSuccess.bind(this),
        error: this.handleError.bind(this),
      });
    }
  }

  private handleSuccess(orderNumber: { purchaseId: number }) {
    this.toastService.showToast(
      false,
      'Our cats get their tickets for free! Enjoy the film =)',
      'success',
    );
    this.toastService.showToast(
      false,
      `You have successfully purchased tickets.
       Your order number: ${orderNumber.purchaseId}`,
      'success'
    );
    this.reloadCurrentRoute();
  }

  private handleError(err: any) {
    this.toastService.showToast(
      false,
      "Ooops... Something went wrong but don't worry, Andromeda is on the way :)",
      'error',
    );
  }

  private reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate([currentUrl]));
  }

  async onSelectSeat(seatBtn: HTMLButtonElement) {
    const dataset = seatBtn.dataset;
    const selectedRow = +dataset['row']!;
    const selectedSeat = +dataset['seat']!;
    if (this.isSeatTaken(selectedRow, selectedSeat)) return;

    this.toggleSeatSelected(seatBtn);
    const ticket = new Ticket(
      selectedRow,
      selectedSeat,
      dataset['type'],
      +dataset['price']!
    );
    const foundedIndex = this.tickets.findIndex(value =>
      isEqual(value, ticket)
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

  unSelectSeat(ticket: Ticket) {
    const hallContainer =
      <HTMLDivElement>this.hallContainerElementRef.nativeElement;
    const seatBtns =
      hallContainer.querySelectorAll<HTMLButtonElement>('.hall__seat');
    const foundedSeat = Array.from(seatBtns)
      .find(seatBtn => {
        const dataset = seatBtn.dataset;
        const row = +dataset['row']!;
        const seat = +dataset['seat']!;
        return ticket.row === row && ticket.seat === seat;
      })!;
    this.toggleSeatSelected(foundedSeat);
  }
}
