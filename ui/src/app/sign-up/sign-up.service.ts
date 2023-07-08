import { Injectable } from '@angular/core';
import { BaseService } from '../shared/base.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../shared/user.model';
import { catchError, defer, ReplaySubject, retry, tap } from 'rxjs';
import { Status } from '../shared/pending/status.enum';

@Injectable({
  providedIn: 'root',
})
export class SignUpService extends BaseService {
  constructor(private http: HttpClient) {
    super();
  }

  register(user: User) {
    const status = new ReplaySubject<Status>();
    const request = this.http.post<void>(`${this.baseUrl}users/new`, user).pipe(
      retry(1),
      catchError((err) => {
        status.next(Status.ERROR);
        throw err;
      }),
      tap(() => status.next(Status.SUCCESS)),
    );

    const data = defer(() => {
      status.next(Status.LOADING);
      return request;
    });

    return { data, status };
  }
}
