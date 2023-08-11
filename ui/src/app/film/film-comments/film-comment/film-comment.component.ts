import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ReactionType } from '../../model/reaction-type';
import { Comment } from '../../model/comment.model';
import { ReactionService } from '../reaction.service';
import { Observable } from 'rxjs';
import { UserClaims } from '@okta/okta-auth-js';
import { ActivatedRoute } from '@angular/router';
import HTTPMethod from 'http-method-enum';
import { Reaction } from '../../model/reaction.model';
import party from 'party-js';

@Component({
  selector: 'app-film-comment',
  templateUrl: './film-comment.component.html',
  styleUrls: ['./film-comment.component.scss'],
})
export class FilmCommentComponent implements OnChanges {
  @Input() comment!: Comment;
  @Input() user!: UserClaims;
  @Input() isAuthenticated$!: Observable<boolean>;
  commentRating = 0;
  @ViewChild('likeBtn') likeBtnRef!: ElementRef;
  protected readonly ReactionType = ReactionType;

  constructor(
    private reactionService: ReactionService,
    private route: ActivatedRoute,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['comment']) {
      this.commentRating = this.calculateCommentRating();
    }
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
    const reaction = this.findCurrentUserReaction();
    if (reaction) {
      const sameReaction = reaction.type === reactionType;
      sameReaction ? this.delete() : this.save(reactionType, HTTPMethod.PUT);
    } else {
      this.save(reactionType, HTTPMethod.POST);
    }
  }

  save(reactionType: ReactionType, method: HTTPMethod.POST | HTTPMethod.PUT) {
    const filmId = this.getFilmId();
    this.reactionService
      .save(filmId, this.comment.id, reactionType, method)
      .data.subscribe((reactions) => {
        if (reactionType === ReactionType.LIKE) {
          this.fireConfetti();
        }
        this.updateReactions(reactions);
      });
  }

  private fireConfetti() {
    party.confetti(this.likeBtnRef.nativeElement, {
      count: party.variation.range(20, 40),
    });
  }

  delete() {
    const filmId = this.getFilmId();
    this.reactionService
      .delete(filmId, this.comment.id)
      .data.subscribe(this.updateReactions.bind(this));
  }

  private getFilmId() {
    return this.route.parent?.snapshot.params['id'];
  }

  private updateReactions(reactions: Reaction[]) {
    this.comment.reactions = reactions;
    this.commentRating = this.calculateCommentRating();
  }

  calculateCommentRating() {
    const likes = this.countReactions(ReactionType.LIKE);
    const dislikes = this.countReactions(ReactionType.DISLIKE);
    return likes - dislikes;
  }

  private countReactions(type: ReactionType) {
    return this.comment.reactions.filter((reaction) => reaction.type === type)
      .length;
  }
}
