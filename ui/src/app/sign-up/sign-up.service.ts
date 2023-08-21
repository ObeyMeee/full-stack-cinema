import { Injectable } from '@angular/core';
import { BaseService } from '../shared/base.service';
import { HttpClient } from '@angular/common/http';
import { RequestStatusService } from '../shared/pending/request-status.service';
import { UserRegisterDto } from './user-register.dto';

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

  register(user: UserRegisterDto) {
    const url = `${this.baseUrl}users/new`;
    const request = this.http.post<void>(url, user);
    return this.requestStatusService.handleRequestWithStatus(request);
  }
}
