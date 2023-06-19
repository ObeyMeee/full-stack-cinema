import {Injectable} from "@angular/core";
import {BaseService} from "../../shared/base.service";
import {HttpClient} from "@angular/common/http";
import {catchError, defer, ReplaySubject, tap} from "rxjs";
import {Status} from "../../shared/status.enum";
import {Comment} from "../model/comment.model";

@Injectable({
  providedIn: 'root'
})
export class CommentService extends BaseService {
  constructor(private http: HttpClient) {
    super();
  }

  getByFilmId(filmId: string, page: number, size: number) {
    const status = new ReplaySubject<Status>();
    const url = `${this.baseUrl}films/${filmId}/comments`;
    const request = this.http.get<CommentResponse>(url, {params: {page, size}})
      .pipe(
        catchError(err => {
          status.next(Status.ERROR);
          throw err;
        }),
        tap(() => status.next(Status.SUCCESS))
      );
    const data = defer(() => {
      status.next(Status.LOADING);
      return request;
    });

    return {data, status};
  }
}

export interface CommentResponse {
  content: Comment[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: any;
  size: number;
  sort: any;
  totalElements: number;
  totalPages: number;
}
