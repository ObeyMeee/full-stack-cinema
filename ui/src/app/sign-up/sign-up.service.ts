import {Injectable} from "@angular/core";
import {Service} from "../shared/base.service";
import {HttpClient} from "@angular/common/http";
import {User} from "../shared/user.model";

@Injectable({
  providedIn: 'root'
})
export class SignUpService extends Service {
  constructor(private http: HttpClient) {
    super();
  }

  register(user: User) {
    return this.http.post(`${this.baseUrl}users/new`, user);
  }
}
