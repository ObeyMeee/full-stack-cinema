import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.development";
import {Film} from "./models/film.model";
import {SessionDto} from "../poster/dto/session.dto";

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  baseUrl = `${environment.apiUrl}films/`;

  constructor(private http: HttpClient) {
  }

  getFilm(id: string) {
    return this.http.get<Film>(`${this.baseUrl}${id}`, {});
  }

  getSessionsId(id: string) {

    return this.http.get<SessionDto[]>(`${this.baseUrl}${id}/sessions`)
  }
}
