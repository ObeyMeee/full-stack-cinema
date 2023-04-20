import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {ProfileDto} from "../profile.dto";
import {isSameSecond} from "date-fns";

@Component({
  selector: 'app-transactions-table',
  templateUrl: './transactions-table.component.html',
  styleUrls: ['./transactions-table.component.css']
})
export class TransactionsTableComponent implements OnChanges {
  @Input() sectionName!: string;
  @Input() noTransactionsMessage!: string;
  @Input() profileDtos!: ProfileDto[];
  filmTransactions: FilmTransaction[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['profileDtos'].currentValue) {
      this.filmTransactions = this.profileDtos.reduce((filmTransactions: FilmTransaction[], cur) => {
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

  onShowDetails(rowElement: HTMLTableRowElement) {
    const boughtAt = new Date(rowElement.dataset['boughtAt']!);
    console.log(this.profileDtos.filter(p => {
      console.log(p.boughtAt, boughtAt);
      return isSameSecond(p.boughtAt, boughtAt);
    }));
  }
}

interface FilmTransaction {
  sessionId: string;
  filmTitle: string;
  boughtAt: Date;
  sessionStartAt: Date;
  quantity: number;
  totalPrice: number;
}
