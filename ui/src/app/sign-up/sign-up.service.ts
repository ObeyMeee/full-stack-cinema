import { Injectable } from '@angular/core';
import { BaseService } from '../shared/base.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../shared/user.model';
import { RequestStatusService } from '../shared/pending/request-status.service';

@Injectable({
  providedIn: 'root',
})
export class SignUpService extends BaseService {
  constructor(
    private http: HttpClient,
    requestStatusService: RequestStatusService,
  ) {
    super(requestStatusService);
  }

  register(user: User) {
    const url = `${this.baseUrl}users/new`;
    const request = this.http.post<void>(url, user);
    return this.requestStatusService.handleRequestWithStatus(request);
  }
}
