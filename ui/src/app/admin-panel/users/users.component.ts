import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { Pending } from '../../shared/pending/pending.interface';
import { User } from './user.interface';
import { Status } from '../../shared/pending/status.enum';
import { Page } from '../../shared/pagination/page.interface';
import { PageEvent } from '../../shared/pagination/page-event.interface';
import { ConfirmationService } from 'primeng/api';
import { ToastService } from '../../shared/toast.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [UserService, ConfirmationService, ToastService],
})
export class UsersComponent implements OnInit {
  usersPage$!: Pending<Page<User>>;
  protected readonly Status = Status;
  first = 0;
  rows = 10;

  constructor(
    private userService: UserService,
    private confirmationService: ConfirmationService,
    private toastService: ToastService,
  ) {}

  ngOnInit() {
    this.usersPage$ = this.userService.getAll();
  }

  delete(user: User) {
    const email = user.profile.email;
    this.confirmationService.confirm({
      message: `Are you sure that you want to delete ${email}?`,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.userService
          .delete(user.id)
          .data.subscribe(() =>
            this.toastService.showToast(true, `User ${email}  deleted`, 'info'),
          );
      },
    });
  }

  fetchUsers($event: PageEvent) {
    this.first = $event.first;
    this.rows = $event.rows;
    this.usersPage$ = this.userService.getAll($event.page, $event.rows);
  }
}
