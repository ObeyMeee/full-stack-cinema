import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {TicketDto} from "./ticket.dto";
import {Service} from "../../shared/base.service";

@Injectable({
  providedIn: "root"
})
export class TicketService extends Service {
  private ticketDtos!: TicketDto[];

  constructor(private http: HttpClient) {
    super();
  }

  getTickets() {
    // if (!this.ticketDtos) {
    //   const url = `${this.baseUrl}tickets/user`;
    //   this.http.get<TicketDto[]>(url).subscribe(response => this.ticketDtos = response);
    // }
    // return this.ticketDtos;
    const url = `${this.baseUrl}tickets/user`;
    return this.http.get<TicketDto[]>(url);
  }
}
