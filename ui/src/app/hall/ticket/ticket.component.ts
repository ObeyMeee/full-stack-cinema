import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Ticket } from '../models/ticket.model';
import { TicketService } from '../ticket.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss'],
})
export class TicketComponent {
  @Input({ required: true }) ticket!: Ticket;
  @Output() remove = new EventEmitter<Ticket>();
  constructor(private ticketService: TicketService) {}

  onRemove() {
    this.ticketService.remove(this.ticket);
    this.remove.emit(this.ticket);
  }
}
