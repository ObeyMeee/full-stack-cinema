import {Injectable} from "@angular/core";
import {BaseService} from "../../shared/base.service";
import {HttpClient} from "@angular/common/http";
import {catchError, defer, ReplaySubject, tap} from "rxjs";
import {Status} from "../../shared/status.enum";
import {Comment} from "../model/comment.model";
import {SortType} from "./sort-type.enum";
import {CommentResponse} from "./comment-response.interface";
import {SortDirection} from "../../shared/sort-direction.enum";

@Injectable({
  providedIn: 'root'
})
export class CommentService extends BaseService {
  constructor(private http: HttpClient) {
    super();
  }

  getByFilmId(filmId: string, page: number, size: number, sort = SortType.RECENT, direction = SortDirection.DESC) {
    console.log(sort)
    const status = new ReplaySubject<Status>();
    const url = `${this.baseUrl}films/${filmId}/comments`;
    const request = this.http.get<CommentResponse>(url, {params: {page, size, sort, direction}})
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

  save(comment: Comment, filmId: string) {
    const url = `${this.baseUrl}films/${filmId}/comments`;
    return this.http.post<Comment>(url, comment)
  }
}
