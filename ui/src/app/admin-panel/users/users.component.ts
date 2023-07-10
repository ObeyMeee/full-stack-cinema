import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { Pending } from '../../shared/pending/pending.interface';
import { User } from './user.interface';
import { Page } from '../../shared/pagination/page.interface';
import { PageEvent } from '../../shared/pagination/page-event.interface';
import { ConfirmationService } from 'primeng/api';
import { ToastService } from '../../shared/toast.service';
import { UserStatus } from '../../shared/user-status.enum';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [UserService, ConfirmationService, ToastService],
})
export class UsersComponent implements OnInit {
  usersPage$!: Pending<Page<User>>;
  first = 0;
  rows = 10;
  editedUser!: User;
  editUserDialog = false;

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
        this.userService.delete(user.id).data.subscribe(() => {
          const page = this.first / this.rows;
          this.usersPage$ = this.userService.getAll(page, this.rows);
          this.toastService.showToast(true, `User ${email}  deleted`, 'info');
        });
      },
    });
  }

  fetchUsers($event: PageEvent) {
    this.first = $event.first;
    this.rows = $event.rows;
    this.usersPage$ = this.userService.getAll($event.page, $event.rows);
  }

  getSeverityStatusTag(status: string) {
    switch (status) {
      case UserStatus.ACTIVE:
        return 'success';
      case UserStatus.DEPROVISIONED:
      case UserStatus.SUSPENDED:
        return 'danger';
      case UserStatus.STAGED:
      case UserStatus.PROVISIONED:
        return 'info';
      default:
        return 'warning';
    }
  }

  getAllUserStatuses() {
    return Object.values(UserStatus);
  }

  edit(user: User) {
    this.editedUser = { ...user };
    this.editUserDialog = true;
  }

  hideDialog() {
    this.editUserDialog = false;
  }

  saveUser() {
    this.editUserDialog = false;
    this.toastService.showToast(
      true,
      "User's been successfully updated",
      'success',
    );
  }
}
