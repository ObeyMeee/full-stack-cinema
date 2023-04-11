import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.development";
import {SessionBuyTicketDto} from "./session-buy-ticket.dto";
import {Ticket} from "./models/ticket.model";

@Injectable({
  providedIn: 'root'
})
export class HallService {
  constructor(private http: HttpClient) {
  }

  getSession(id: string) {
    const {apiUrl} = environment;
    return this.http.get<SessionBuyTicketDto>(`${apiUrl}sessions/${id}`);
  }

  purchaseTickets(tickets: Ticket[], sessionId: string) {
    const {apiUrl} = environment;
    this.http.post(`${apiUrl}tickets`, {tickets, sessionId})
      .subscribe({next: console.log, error: console.error});
  }
}
