import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.development";
import {Film} from "./models/film.model";

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  constructor(private http: HttpClient) {
  }

  getFilm(id: string) {
    const {apiUrl} = environment;
    return this.http.get<Film>(`${apiUrl}films/${id}`, {});
  }
}
