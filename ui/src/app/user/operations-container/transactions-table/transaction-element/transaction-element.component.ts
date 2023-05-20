import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {FilmTransaction} from "../film-transaction.interface";
import {TicketService} from "../../ticket-service";

@Component({
  selector: 'app-transaction-element',
  templateUrl: './transaction-element.component.html',
  styleUrls: ['./transaction-element.component.css']
})
export class TransactionElementComponent {
  @Input() transaction!: FilmTransaction;
  @ViewChild('rowElement') rowElement!: ElementRef;
  isDetailsShown = false;

  constructor(private ticketService: TicketService) {
  }

  onToggleDetails() {
    this.isDetailsShown = !this.isDetailsShown;
    const boughtAt = new Date(this.rowElement.nativeElement.dataset['boughtAt']!);
    // this.ticketService.getTickets().filter(p => isSameSecond(p.boughtAt, boughtAt));
  }

  onMouseOverRow() {
    this.rowElement.nativeElement.classList.add('bg-secondary');
  }

  onMouseLeaveRow() {
    this.rowElement.nativeElement.classList.remove('bg-secondary');
  }
}
