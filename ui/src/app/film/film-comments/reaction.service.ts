import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../../shared/base.service';
import { ReactionType } from '../model/reaction-type';
import { RequestStatusService } from '../../shared/pending/request-status.service';

@Injectable({
  providedIn: 'root',
})
export class ReactionService extends BaseService {
  constructor(
    private http: HttpClient,
    requestStatusService: RequestStatusService,
  ) {
    super(requestStatusService);
  }

  save(filmId: string, commentId: string, reactionType: ReactionType) {
    return this.sendRequest(filmId, commentId, reactionType, 'post');
  }

  private sendRequest(
    filmId: string,
    commentId: string,
    reactionType: ReactionType,
    method: 'post' | 'put',
  ) {
    const url = this.getUrl(filmId, commentId);
    const request = this.http[method]<void>(url, { type: reactionType });
    return this.requestStatusService.handleRequestWithStatus<void>(request);
  }

  private getUrl(filmId: string, commentId: string) {
    return `${this.baseUrl}films/${filmId}/comments/${commentId}/reactions`;
  }

  update(filmId: string, commentId: string, reactionType: ReactionType) {
    return this.sendRequest(filmId, commentId, reactionType, 'put');
  }

  delete(filmId: string, commentId: string) {
    const url = this.getUrl(filmId, commentId);
    const request = this.http.delete<void>(url);
    return this.requestStatusService.handleRequestWithStatus<void>(request);
  }
}
