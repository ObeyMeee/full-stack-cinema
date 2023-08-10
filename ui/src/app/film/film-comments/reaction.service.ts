import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../../shared/base.service';
import { ReactionType } from '../model/reaction-type';
import { RequestStatusService } from '../../shared/pending/request-status.service';
import HTTPMethod from 'http-method-enum';
import { Reaction } from '../model/reaction.model';

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

  save(
    filmId: string,
    commentId: string,
    reactionType: ReactionType,
    method: HTTPMethod.POST | HTTPMethod.PUT,
  ) {
    const url = this.getUrl(filmId, commentId);
    // @ts-ignore
    const request = this.http[method.toLowerCase()]<Reaction[]>(url, {
      type: reactionType,
    });
    return this.requestStatusService.handleRequestWithStatus<Reaction[]>(
      request,
    );
  }

  private getUrl(filmId: string, commentId: string) {
    return `${this.baseUrl}films/${filmId}/comments/${commentId}/reactions`;
  }

  delete(filmId: string, commentId: string) {
    const url = this.getUrl(filmId, commentId);
    const request = this.http.delete<Reaction[]>(url);
    return this.requestStatusService.handleRequestWithStatus<Reaction[]>(
      request,
    );
  }
}
