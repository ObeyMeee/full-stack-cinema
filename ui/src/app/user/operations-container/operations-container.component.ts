import {Component, OnInit} from '@angular/core';
import {TicketService} from "./ticket-service";
import {isFuture} from "date-fns";
import {TicketDto} from "./ticket.dto";

@Component({
  selector: 'app-operations-container',
  templateUrl: './operations-container.component.html',
  styleUrls: ['./operations-container.component.css']
})
export class OperationsContainerComponent implements OnInit {
  ticketDtos!: TicketDto[];
  filteredTicketDtos!: TicketDto[];

  constructor(private ticketService: TicketService) {
  }

  ngOnInit() {
    this.ticketService.getTickets().subscribe(response => {
      this.ticketDtos = response;
      this.filteredTicketDtos = this.ticketDtos.filter(p => isFuture(p.sessionStartAt));
    });
  }
}
