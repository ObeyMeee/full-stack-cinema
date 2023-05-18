import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Film} from "./models/film.model";
import {SessionDto} from "../poster/dto/session.dto";
import {Service} from "../shared/base.service";

@Injectable({
  providedIn: 'root'
})
export class FilmService extends Service {
  constructor(private http: HttpClient) {
    super();
  }

  getFilm(id: string) {
    return this.http.get<Film>(`${this.baseUrl}films/${id}`);
  }

  getSessionsById(id: string) {
    return this.http.get<SessionDto[]>(`${this.baseUrl}films/${id}/sessions`)
  }
}
