import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { OktaAuthStateService } from '@okta/okta-angular';
import { Pending } from '../../shared/pending/pending.interface';
import { Comment } from '../model/comment.model';
import { CommentService } from './comment.service';
import { SortType } from './sort-type.enum';
import { PageEvent } from '../../shared/pagination/page-event.interface';
import { Page } from '../../shared/pagination/page.interface';
import { ToastService } from '../../shared/toast.service';

@Component({
  selector: 'app-film-comments',
  templateUrl: './film-comments.component.html',
  styleUrls: ['./film-comments.component.scss'],
})
export class FilmCommentsComponent implements OnInit {
  commentsPage$!: Pending<Page<Comment>>;
  isAuthenticated$!: Observable<boolean>;
  leftComment = new Comment();
  visibleLeaveCommentDialog = false;
  first = 0;
  rows = 3;
  sortType = SortType.RECENT;

  constructor(
    private commentService: CommentService,
    private toastService: ToastService,
    private route: ActivatedRoute,
    private oktaStateService: OktaAuthStateService,
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
  }

  private getFilmId() {
    return this.route.parent?.snapshot.params['id'];
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

  getSortOptions() {
    return Object.values(SortType);
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
