import { Injectable } from '@angular/core';
import { Ticket } from './models/ticket.model';

@Injectable()
export class TicketService {
  _tickets: Ticket[] = [];

  get tickets() {
    return this._tickets;
  }

  add(ticket: Ticket) {
    this._tickets.push(ticket);
  }

  removeByIndex(index: number) {
    this._tickets.splice(index, 1);
  }

  remove(ticket: Ticket) {
    const index = this._tickets.indexOf(ticket);
    this.removeByIndex(index);
  }

  getTotalPrice() {
    return this._tickets
      .map((ticket) => ticket.price)
      .reduce((acc, price) => acc! + price!, 0);
  }
}
