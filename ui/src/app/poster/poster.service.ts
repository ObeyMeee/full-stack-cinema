import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PosterDto } from './dto/poster.dto';
import { BaseService } from '../shared/base.service';
import { RequestStatusService } from '../shared/pending/request-status.service';

@Injectable({
  providedIn: 'root',
})
export class PosterService extends BaseService {
  constructor(
    private http: HttpClient,
    requestStatusService: RequestStatusService,
  ) {
    super(requestStatusService);
  }

  getPoster() {
    const url = `${this.baseUrl}films`;
    const request = this.http.get<PosterDto[]>(url);
    return this.requestStatusService.handleRequestWithStatus<PosterDto[]>(
      request,
    );
  }
}
