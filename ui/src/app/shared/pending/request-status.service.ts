import { Injectable } from '@angular/core';
import { catchError, defer, Observable, ReplaySubject, retry, tap } from 'rxjs';
import { Status } from './status.enum';

@Injectable({
  providedIn: 'root',
})
export class RequestStatusService {
  handleRequestWithStatus<T>(request: Observable<T>) {
    const status = new ReplaySubject<Status>();
    request.pipe(
      retry(2),
      catchError((err) => {
        status.next(Status.ERROR);
        throw err;
      }),
      tap(() => {
        status.next(Status.SUCCESS);
      }),
    );

    const data = defer(() => {
      status.next(Status.LOADING);
      return request;
    });

    return { data, status };
  }
}
