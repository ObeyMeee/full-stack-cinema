import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {SessionBuyTicketDto} from "./session-buy-ticket.dto";
import {Ticket} from "./models/ticket.model";
import {BaseService} from "../shared/base.service";

@Injectable({
  providedIn: 'root'
})
export class HallService extends BaseService {
  constructor(private http: HttpClient) {
    super();
  }

  getSession(id: string) {
    return this.http.get<SessionBuyTicketDto>(`${this.baseUrl}sessions/${id}`);
  }

  purchaseTickets(tickets: Ticket[], sessionId: string) {
    return this.http.post(`${this.baseUrl}tickets`, {tickets, sessionId});
  }
}
