import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../../shared/base.service';
import { ReactionType } from '../model/reaction-type';

@Injectable({
  providedIn: 'root',
})
export class ReactionService extends BaseService {
  constructor(private http: HttpClient) {
    super();
  }

  save(filmId: string, commentId: string, reactionType: ReactionType) {
    const url = `${this.baseUrl}films/${filmId}/comments/${commentId}/reactions`;
    return this.http.post(url, { type: reactionType });
  }

  delete(filmId: string, commentId: string) {
    const url = `${this.baseUrl}films/${filmId}/comments/${commentId}/reactions`;
    return this.http.delete(url);
  }

  update(filmId: string, commentId: string, reactionType: ReactionType) {
    const url = `${this.baseUrl}films/${filmId}/comments/${commentId}/reactions`;
    return this.http.put(url, { type: reactionType });
  }
}
