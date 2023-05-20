import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {FilmTransaction} from "../film-transaction.interface";
import {TicketService} from "../../ticket-service";
import {TicketDto} from "../../ticket.dto";

@Component({
  selector: 'app-transaction-element',
  templateUrl: './transaction-element.component.html',
  styleUrls: ['./transaction-element.component.css']
})
export class TransactionElementComponent {
  @Input() transaction!: FilmTransaction;
  @Input() ticketDtos!: TicketDto[];
  @ViewChild('rowElement') rowElement!: ElementRef;
  isDetailsShown = false;

  constructor(private ticketService: TicketService) {
  }

  onToggleDetails() {
    this.isDetailsShown = !this.isDetailsShown;
  }

  onMouseOverRow() {
    this.rowElement.nativeElement.classList.add('bg-secondary');
  }

  onMouseLeaveRow() {
    this.rowElement.nativeElement.classList.remove('bg-secondary');
  }
}
