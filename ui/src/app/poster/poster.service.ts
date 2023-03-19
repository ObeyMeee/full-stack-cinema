import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.development";
import {PosterDto} from "./poster.dto";

@Injectable({
  providedIn: 'root'
})
export class PosterService {

  constructor(private http: HttpClient) {
  }

  getPoster() {
    const url = `${environment.apiUrl}poster`
    return this.http.get<PosterDto[]>(url);
  }
}
