import { Component, Input } from '@angular/core';
import { Ticket } from '../models/ticket.model';
import { TicketService } from '../ticket.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss'],
})
export class TicketComponent {
  @Input() ticket!: Ticket;

  constructor(private ticketService: TicketService) {}

  onRemove() {
    this.ticketService.remove(this.ticket);
  }
}
