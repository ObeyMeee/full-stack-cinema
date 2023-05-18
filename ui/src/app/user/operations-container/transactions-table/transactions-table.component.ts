import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {TicketDto} from "../ticket.dto";
import {FilmTransaction} from "./film-transaction.interface";

@Component({
  selector: 'app-transactions-table',
  templateUrl: './transactions-table.component.html',
  styleUrls: ['./transactions-table.component.css']
})
export class TransactionsTableComponent implements OnChanges {
  @Input() sectionName!: string;
  @Input() noTransactionsMessage!: string;
  @Input() ticketDtos!: TicketDto[];
  filmTransactions: FilmTransaction[] = [];

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes['ticketDtos']);
    if (changes['ticketDtos'] && this.ticketDtos) {
      this.filmTransactions = this.ticketDtos.reduce((filmTransactions: FilmTransaction[], cur) => {
        const existingSession = filmTransactions.find(item => item.sessionId === cur.sessionId);
        if (existingSession) {
          existingSession.totalPrice += cur.ticket.price!;
          ++existingSession.quantity;
        } else {
          filmTransactions.push({
            sessionId: cur.sessionId,
            sessionStartAt: cur.sessionStartAt,
            boughtAt: cur.boughtAt,
            filmTitle: cur.filmTitle,
            totalPrice: cur.ticket.price!,
            quantity: 1
          });
        }
        return filmTransactions;
      }, []);
    }
  }
}
