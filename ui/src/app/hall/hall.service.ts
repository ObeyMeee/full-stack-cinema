import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SessionBuyTicketDto } from './session-buy-ticket.dto';
import { Ticket } from './models/ticket.model';
import { BaseService } from '../shared/base.service';
import { RequestStatusService } from '../shared/pending/request-status.service';

@Injectable({
  providedIn: 'root',
})
export class HallService extends BaseService {
  constructor(
    private http: HttpClient,
    requestStatusService: RequestStatusService,
  ) {
    super(requestStatusService);
  }

  getSession(id: string) {
    const url = `${this.baseUrl}sessions/${id}`;
    const request = this.http.get<SessionBuyTicketDto>(url);
    return this.requestStatusService.handleRequestWithStatus<SessionBuyTicketDto>(
      request,
    );
  }

  purchaseTickets(tickets: Ticket[], sessionId: string) {
    const url = `${this.baseUrl}tickets`;
    const request = this.http.post<void>(url, { tickets, sessionId });
    return this.requestStatusService.handleRequestWithStatus<void>(request);
  }
}
