import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/base.service';
import { HttpClient } from '@angular/common/http';
import { Comment } from '../model/comment.model';
import { SortType } from './sort-type.enum';
import { SortDirection } from '../../shared/sort-direction.enum';
import { Page } from '../../shared/pagination/page.interface';
import { RequestStatusService } from '../../shared/pending/request-status.service';

@Injectable({
  providedIn: 'root',
})
export class CommentService extends BaseService {
  constructor(
    private http: HttpClient,
    requestStatusService: RequestStatusService,
  ) {
    super(requestStatusService);
  }

  getByFilmId(
    filmId: string,
    page: number,
    size: number,
    sort = SortType.RECENT,
    direction = SortDirection.DESC,
  ) {
    const url = `${this.baseUrl}films/${filmId}/comments`;
    const request = this.http.get<Page<Comment>>(url, {
      params: { page, size, sort, direction },
    });
    return this.requestStatusService.handleRequestWithStatus<Page<Comment>>(
      request,
    );
  }

  save(comment: Comment, filmId: string) {
    const url = `${this.baseUrl}films/${filmId}/comments`;
    const request = this.http.post<Comment>(url, comment);
    return this.requestStatusService.handleRequestWithStatus<Comment>(request);
  }
}
