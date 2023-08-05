import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Film } from './model/film.model';
import { SessionDto } from '../poster/dto/session.dto';
import { BaseService } from '../shared/base.service';
import { RequestStatusService } from '../shared/pending/request-status.service';

@Injectable({
  providedIn: 'root',
})
export class FilmService extends BaseService {
  constructor(
    private http: HttpClient,
    requestStatusService: RequestStatusService,
  ) {
    super(requestStatusService);
  }

  getById(id: string) {
    const url = `${this.baseUrl}films/${id}`;
    const request = this.http.get<Film>(url);
    return this.requestStatusService.handleRequestWithStatus<Film>(request);
  }

  getSessionsById(id: string) {
    const url = `${this.baseUrl}films/${id}/sessions`;
    const request = this.http.get<SessionDto[]>(url);
    return this.requestStatusService.handleRequestWithStatus<SessionDto[]>(
      request,
    );
  }
}
