import { Component, Inject, Input, OnInit } from '@angular/core';
import { ReactionType } from '../../model/reaction-type';
import { Comment } from '../../model/comment.model';
import { ReactionService } from '../reaction.service';
import { map, Observable } from 'rxjs';
import { OKTA_AUTH, OktaAuthStateService } from '@okta/okta-angular';
import OktaAuth, { UserClaims } from '@okta/okta-auth-js';
import { ActivatedRoute } from '@angular/router';
import HTTPMethod from 'http-method-enum';

@Component({
  selector: 'app-film-comment',
  templateUrl: './film-comment.component.html',
  styleUrls: ['./film-comment.component.scss'],
})
export class FilmCommentComponent implements OnInit {
  @Input() comment!: Comment;
  user!: UserClaims;
  isAuthenticated$!: Observable<boolean>;
  protected readonly ReactionType = ReactionType;

  constructor(
    private reactionService: ReactionService,
    private route: ActivatedRoute,
    private oktaStateService: OktaAuthStateService,
    @Inject(OKTA_AUTH) private oktaAuth: OktaAuth,
  ) {}

  async ngOnInit() {
    this.isAuthenticated$ = this.oktaStateService.authState$.pipe(
      map((authState) => !!authState.isAuthenticated),
    );
    this.user = await this.oktaAuth.getUser();
  }

  currentUserReacted(reactionType: ReactionType) {
    const reaction = this.findCurrentUserReaction();
    return reaction?.type === reactionType ? '-fill' : '';
  }

  findCurrentUserReaction() {
    return this.comment.reactions.find(
      (reaction) => reaction.username === this.user?.preferred_username,
    );
  }

  async reactOnComment(reactionType: ReactionType) {
    const filmId = this.getFilmId();
    const reaction = this.findCurrentUserReaction();
    if (reaction) {
      if (reaction.type === reactionType) {
        this.reactionService
          .delete(filmId, this.comment.id)
          .data.subscribe((reactions) => (this.comment.reactions = reactions));
      } else {
        this.reactionService
          .save(filmId, this.comment.id, reactionType, HTTPMethod.PUT)
          .data.subscribe((reactions) => {
            console.log(reactions.length);
            this.comment.reactions = reactions;
          });
      }
    } else {
      this.reactionService
        .save(filmId, this.comment.id, reactionType, HTTPMethod.POST)
        .data.subscribe((reactions) => {
          console.log(reactions.length);
          this.comment.reactions = reactions;
        });
    }
  }

  private getFilmId() {
    return this.route.parent?.snapshot.params['id'];
  }

  getCommentRating() {
    const likes = this.countReactions(ReactionType.LIKE);
    const dislikes = this.countReactions(ReactionType.DISLIKE);
    return likes - dislikes;
  }

  private countReactions(type: ReactionType) {
    return this.comment.reactions.filter((reaction) => reaction.type === type)
      .length;
  }
}
