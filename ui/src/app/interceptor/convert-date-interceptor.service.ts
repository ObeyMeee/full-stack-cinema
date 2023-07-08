import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable()
export class ConvertDateInterceptorService implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    if (req.responseType === 'json') {
      const cloneReq = req.clone({
        responseType: 'json',
      });
      return next.handle(cloneReq).pipe(
        map((response) => {
          if (response instanceof HttpResponse) {
            const body = response.body;
            if (body) {
              Array.isArray(body)
                ? body.map((item) => this.convertDates(item))
                : this.convertDates(body);
            }
          }
          return response;
        }),
      );
    }
    return next.handle(req);
  }

  private convertDates(obj: any): any {
    for (const [key, value] of Object.entries(obj)) {
      if (value instanceof Object) {
        obj[key] = this.convertDates(value);
      } else if (
        typeof value === 'string' &&
        /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/.test(value)
      ) {
        obj[key] = new Date(value);
      }
    }
    return obj;
  }
}
