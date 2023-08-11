import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { OKTA_AUTH, OktaAuthStateService } from '@okta/okta-angular';
import { Pending } from '../../shared/pending/pending.interface';
import { Comment } from '../model/comment.model';
import { CommentService } from './comment.service';
import { SortType } from './sort-type.enum';
import { PageEvent } from '../../shared/pagination/page-event.interface';
import { Page } from '../../shared/pagination/page.interface';
import { ToastService } from '../../shared/toast.service';
import { capitalize } from 'lodash';
import OktaAuth, { UserClaims } from '@okta/okta-auth-js';

@Component({
  selector: 'app-film-comments',
  templateUrl: './film-comments.component.html',
  styleUrls: ['./film-comments.component.scss'],
})
export class FilmCommentsComponent implements OnInit {
  commentsPage$!: Pending<Page<Comment>>;
  isAuthenticated$!: Observable<boolean>;
  user!: UserClaims;
  leftComment = new Comment();
  visibleLeaveCommentDialog = false;
  first = 0;
  rows = 3;
  sortOptions!: { label: string; value: SortType }[];
  sortType = SortType.RECENT;

  constructor(
    private commentService: CommentService,
    private toastService: ToastService,
    private route: ActivatedRoute,
    private oktaStateService: OktaAuthStateService,
    @Inject(OKTA_AUTH) private oktaAuth: OktaAuth,
  ) {}

  async ngOnInit() {
    const id = this.getFilmId();
    this.commentsPage$ = this.commentService.getByFilmId(
      id,
      this.first,
      this.rows,
    );
    this.isAuthenticated$ = this.oktaStateService.authState$.pipe(
      map((authState) => !!authState.isAuthenticated),
    );
    this.user = await this.oktaAuth.getUser();
    this.sortOptions = this.getSortOptions();
  }

  private getFilmId() {
    return this.route.parent?.snapshot.params['id'];
  }

  private getSortOptions() {
    return Object.values(SortType).map((sortOption) => ({
      label: capitalize(sortOption),
      value: sortOption,
    }));
  }

  onPageChange(event: PageEvent) {
    this.first = event.first;
    this.rows = event.rows;
    const id = this.getFilmId();
    this.commentsPage$ = this.commentService.getByFilmId(
      id,
      event.page,
      event.rows,
      this.sortType,
    );
  }

  toggleLeaveCommentDialog() {
    this.visibleLeaveCommentDialog = !this.visibleLeaveCommentDialog;
  }

  onSendComment() {
    this.toggleLeaveCommentDialog();
    const filmId = this.getFilmId();
    this.commentService.save(this.leftComment, filmId).data.subscribe(() => {
      this.commentsPage$ = this.commentService.getByFilmId(
        filmId,
        this.first,
        this.rows,
      );
      this.toastService.showToast(
        true,
        'You have successfully left review!',
        'success',
      );
    });
  }

  changeSorting($event: SortType) {
    this.commentsPage$ = this.commentService.getByFilmId(
      this.getFilmId(),
      0,
      3,
      $event,
    );
  }
}
