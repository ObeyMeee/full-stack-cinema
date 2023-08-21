import { Injectable } from '@angular/core';
import { catchError, defer, Observable, ReplaySubject, tap } from 'rxjs';
import { Status } from './status.enum';

@Injectable({
  providedIn: 'root',
})
export class RequestStatusService {
  handleRequestWithStatus<T>(request: Observable<T>) {
    const status = new ReplaySubject<Status>();
    const data = defer(() => {
      status.next(Status.LOADING);
      return request.pipe(
        catchError((err) => {
          status.next(Status.ERROR);
          throw err;
        }),
        tap(() => status.next(Status.SUCCESS)),
      );
    });
    return { data, status };
  }
}
