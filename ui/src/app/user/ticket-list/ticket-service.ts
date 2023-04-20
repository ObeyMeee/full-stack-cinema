import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ProfileDto} from "./profile.dto";
import {Service} from "../../shared/base.service";

@Injectable({
  providedIn: "root"
})
export class TicketService extends Service {
  constructor(private http: HttpClient) {
    super();
  }

  getTickets() {
    const url = `${this.baseUrl}tickets/user`;
    return this.http.get<ProfileDto[]>(url);
  }
}
