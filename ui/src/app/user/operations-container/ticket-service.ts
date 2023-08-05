import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TicketDto } from './ticket.dto';
import { BaseService } from '../../shared/base.service';
import { isFuture } from 'date-fns';
import { map, Observable } from 'rxjs';
import { RequestStatusService } from '../../shared/pending/request-status.service';

@Injectable({
  providedIn: 'root',
})
export class TicketService extends BaseService {
  private _ticketDtos$: Observable<TicketDto[]> | undefined;

  // todo
  constructor(
    private http: HttpClient,
    requestStatusService: RequestStatusService,
  ) {
    super(requestStatusService);
  }

  getAll(): Observable<TicketDto[]> {
    if (!this._ticketDtos$) {
      const url = `${this.baseUrl}tickets/user`;
      this._ticketDtos$ = this.http.get<TicketDto[]>(url);
    }
    return this._ticketDtos$;
  }

  getAllActive(): Observable<TicketDto[]> {
    return this.getAll().pipe(
      map((ticketDtos) => ticketDtos.filter((t) => isFuture(t.sessionStartAt))),
    );
  }
}
