import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../../shared/base.service';
import { RequestStatusService } from '../../shared/pending/request-status.service';
import { UserTableDto } from './user-table.dto';

@Injectable()
export class UserService extends BaseService {
  constructor(
    private http: HttpClient,
    requestStatusService: RequestStatusService,
  ) {
    super(requestStatusService);
  }

  getAll() {
    const url = `${this.baseUrl}users`;
    const request = this.http.get<UserTableDto[]>(url);
    return this.requestStatusService.handleRequestWithStatus<UserTableDto[]>(
      request,
    );
  }

  delete(id: string) {
    const url = `${this.baseUrl}users/${id}`;
    const request = this.http.delete<void>(url);
    return this.requestStatusService.handleRequestWithStatus<void>(request);
  }

  update(user: UserTableDto) {
    const url = `${this.baseUrl}users`;
    const request = this.http.put<UserTableDto>(url, user);
    return this.requestStatusService.handleRequestWithStatus<UserTableDto>(
      request,
    );
  }
}
