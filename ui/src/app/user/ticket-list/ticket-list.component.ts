import {Component, OnInit} from '@angular/core';
import {TicketService} from "./ticket-service";
import {isFuture} from "date-fns";
import {ProfileDto} from "./profile.dto";

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {
  profileDto!: ProfileDto[];

  constructor(private ticketService: TicketService) {
  }

  ngOnInit() {
    this.ticketService.getTickets()
      .subscribe(response => this.profileDto = response);
  }

  filterActiveTickets() {
    return this.profileDto?.filter(p => isFuture(p.sessionStartAt));
  }
}
