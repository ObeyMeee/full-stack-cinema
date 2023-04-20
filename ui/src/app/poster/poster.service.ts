import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PosterDto} from "./dto/poster.dto";
import {map} from "rxjs";
import {Service} from "../shared/base.service";

@Injectable({
  providedIn: 'root'
})
export class PosterService extends Service {
  constructor(private http: HttpClient) {
    super();
  }

  getPoster() {
    const url = `${this.baseUrl}films`;
    return this.http.get<PosterDto[]>(url);
  }

  getSessions() {
    const url = `${this.baseUrl}sessions`;
    return this.http.get(url).pipe(map(response => new Map(Object.entries(response))));
  }
}

