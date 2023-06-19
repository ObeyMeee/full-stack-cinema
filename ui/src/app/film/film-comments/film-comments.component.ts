import {AfterContentChecked, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FilmService} from "../film.service";
import {ActivatedRoute} from "@angular/router";
import {map, Observable, take} from "rxjs";
import {OKTA_AUTH, OktaAuthStateService} from "@okta/okta-angular";
import {Message} from "primeng/api";
import {Status} from "../../shared/status.enum";
import {Pending} from "../../shared/pending.interface";
import {Comment} from "../model/comment.model";
import {ReactionType} from "../model/reaction-type";
import {ReactionService} from "./reaction-service";
import {CommentResponse, CommentService} from "./comment.service";
import OktaAuth, {UserClaims} from "@okta/okta-auth-js";

@Component({
  selector: 'app-film-comments',
  templateUrl: './film-comments.component.html',
  styleUrls: ['./film-comments.component.css']
})
export class FilmCommentsComponent implements OnInit, AfterContentChecked {
  commentResponse$!: Pending<CommentResponse>;
  isAuthenticated$!: Observable<boolean>;
  authenticatedInfoMessage!: Message[];
  noCommentsInfoMessage!: Message[];
  user!: UserClaims;
  leftComment = new Comment();
  visibleLeftCommentDialog = false;

  first = 0;
  rows = 3;

  protected readonly Status = Status;
  protected readonly ReactionType = ReactionType;

  constructor(private filmService: FilmService,
              private commentService: CommentService,
              private reactionService: ReactionService,
              private route: ActivatedRoute,
              private changeDetector: ChangeDetectorRef,
              private oktaStateService: OktaAuthStateService,
              @Inject(OKTA_AUTH) private oktaAuth: OktaAuth) {
  }

  async ngOnInit() {
    this.authenticatedInfoMessage = [
      {severity: 'info', summary: 'Info', detail: 'Only authenticated users can leave comments and reactions!'},
    ];

    this.noCommentsInfoMessage = [
      {severity: 'info', summary: 'Info', detail: 'There is no comments yet. Leave one to be first :)'},
    ];

    const id = this.getFilmId();
    this.commentResponse$ = this.commentService.getByFilmId(id, this.first, this.rows);
    this.isAuthenticated$ = this.oktaStateService.authState$.pipe(
      map(authState => !!authState.isAuthenticated)
    );
    this.isAuthenticated$.pipe(take(1)).subscribe(async isAuthenticated => {
        if (isAuthenticated)
          this.user = await this.oktaAuth.getUser();
      }
    )
  }

  private getFilmId() {
    return this.route.parent?.snapshot.params['id'];
  }

  ngAfterContentChecked() {
    this.changeDetector.detectChanges();
  }

  currentUserReacted(comment: Comment, reactionType: ReactionType) {
    const reaction = comment.reactions.find(reaction => reaction.username === this.user?.preferred_username);
    return reaction?.type === reactionType ? '-fill' : '';
  }

  reactOnComment(comment: Comment, reactionType: ReactionType) {
    const filmId = this.getFilmId();
    const reaction = comment.reactions.find(reaction => reaction.username === this.user?.preferred_username);
    if (reaction) {
      if (reaction.type === reactionType) {
        this.reactionService.delete(filmId, comment.id).subscribe();
      } else {
        this.reactionService.update(filmId, comment.id, reactionType).subscribe();
      }
    } else {
      this.reactionService.save(filmId, comment.id, reactionType).subscribe();
    }
  }

  onPageChange(event: PageEvent) {
    this.first = event.first;
    this.rows = event.rows;
    const id = this.getFilmId();
    this.commentResponse$ = this.commentService.getByFilmId(id, event.page, event.rows);
  }

  getCommentRating(comment: Comment) {
    const likes = this.countReactions(comment, ReactionType.LIKE);
    const dislikes = this.countReactions(comment, ReactionType.DISLIKE);
    return likes - dislikes;
  }

  private countReactions(comment: Comment, type: ReactionType) {
    return comment.reactions
      .filter(reaction => reaction.type === type)
      .length;
  }

  toggleLeaveCommentDialog() {
    this.visibleLeftCommentDialog = !this.visibleLeftCommentDialog;
  }

  onSendComment() {
    this.toggleLeaveCommentDialog();
    const filmId = this.getFilmId();
    this.commentService.save(this.leftComment, filmId).subscribe(console.log);
  }
}

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}
