import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.development";
import {PosterDto} from "./dto/poster.dto";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PosterService {

  constructor(private http: HttpClient) {
  }

  getPoster() {
    const url = `${environment.apiUrl}films`
    return this.http.get<PosterDto[]>(url);
  }

  getSessions() {
    const url = `${environment.apiUrl}sessions`;
    return this.http.get(url).pipe(map(response => new Map(Object.entries(response))));
  }
}

