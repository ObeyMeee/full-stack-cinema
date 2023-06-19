import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PosterDto} from "./dto/poster.dto";
import {BaseService} from "../shared/base.service";

@Injectable({
  providedIn: 'root'
})
export class PosterService extends BaseService {
  constructor(private http: HttpClient) {
    super();
  }

  getPoster() {
    const url = `${this.baseUrl}films`;
    return this.http.get<PosterDto[]>(url);
  }
}
