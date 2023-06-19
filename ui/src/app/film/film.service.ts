import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Film} from "./model/film.model";
import {SessionDto} from "../poster/dto/session.dto";
import {BaseService} from "../shared/base.service";

@Injectable({
  providedIn: 'root'
})
export class FilmService extends BaseService {
  constructor(private http: HttpClient) {
    super();
  }

  getById(id: string) {
    return this.http.get<Film>(`${this.baseUrl}films/${id}`);
  }

  getSessionsById(id: string) {
    return this.http.get<SessionDto[]>(`${this.baseUrl}films/${id}/sessions`)
  }
}
