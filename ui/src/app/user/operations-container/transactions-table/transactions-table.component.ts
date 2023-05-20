import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {TicketDto} from "../ticket.dto";
import {FilmTransaction} from "./film-transaction.interface";
import {TicketService} from "../ticket-service";
import {Observable} from "rxjs";
import {compareDesc, isEqual} from "date-fns";

@Component({
  selector: 'app-transactions-table',
  templateUrl: './transactions-table.component.html',
  styleUrls: ['./transactions-table.component.css']
})
export class TransactionsTableComponent implements OnChanges, OnInit {
  @Input() sectionName!: string;
  @Input() noTransactionsMessage!: string;
  @Input() onlyActiveTickets!: boolean;
  ticketDtos$!: Observable<TicketDto[]>;
  filmTransactions: FilmTransaction[] = [];

  constructor(private ticketService: TicketService) {
  }

  ngOnInit() {
    this.ticketDtos$ = this.ticketService.getAll();
  }


  ngOnChanges(changes: SimpleChanges) {
    if (changes['onlyActiveTickets']) {
      if (this.onlyActiveTickets) {
        this.ticketDtos$ = this.ticketService.getAllActive();
      } else {
        this.ticketDtos$ = this.ticketService.getAll();
      }
    }

    this.ticketDtos$.subscribe(ticketDtos => {
      this.filmTransactions = ticketDtos.reduce((filmTransactions: FilmTransaction[], cur) => {
        const existingSession = filmTransactions.find(item =>
          isEqual(item.boughtAt, cur.boughtAt)
        );
        if (existingSession) {
          existingSession.totalPrice += cur.ticket.price!;
          ++existingSession.quantity;
        } else {
          this.add(filmTransactions, cur);
        }
        return filmTransactions;
      }, [])
        .sort((a, b) => compareDesc(a.boughtAt, b.boughtAt));
    });
  }

  private add(filmTransactions: FilmTransaction[], ticketDto: TicketDto) {
    filmTransactions.push({
      sessionId: ticketDto.sessionId,
      sessionStartAt: ticketDto.sessionStartAt,
      boughtAt: ticketDto.boughtAt,
      filmTitle: ticketDto.filmTitle,
      totalPrice: ticketDto.ticket.price!,
      quantity: 1
    });
  }

  filterTicketsByTransaction(ticketDtos: TicketDto[], transaction: FilmTransaction) {
    return ticketDtos.filter(t => isEqual(t.boughtAt, transaction.boughtAt));
  }
}
