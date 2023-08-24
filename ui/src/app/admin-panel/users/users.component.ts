import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from './user.service';
import { Pending } from '../../shared/pending/pending.interface';
import { UserTableDto } from './user-table.dto';
import { ConfirmationService } from 'primeng/api';
import { ToastService } from '../../shared/toast.service';
import { UserStatus } from '../../shared/user-status.enum';
import { Status } from '../../shared/pending/status.enum';
import { Table } from 'primeng/table';
import { Phone } from '../../shared/phone.model';
import { CountryISO } from 'ngx-intl-tel-input';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [UserService, ConfirmationService, ToastService],
})
export class UsersComponent implements OnInit {
  usersPage$!: Pending<UserTableDto[]>;
  editedUser!: UserTableDto;
  editUserDialog = false;
  allUserStatuses!: UserStatus[];
  userStatusesToUpdate!: UserStatus[];
  @ViewChild('usersTable') usersTable!: Table;

  protected readonly Status = Status;
  protected readonly CountryISO = CountryISO;

  constructor(
    private userService: UserService,
    private confirmationService: ConfirmationService,
    private toastService: ToastService,
  ) {}

  ngOnInit() {
    this.usersPage$ = this.userService.getAll();
    this.allUserStatuses = Object.values(UserStatus);
  }

  delete(user: UserTableDto) {
    this.confirmationService.close();
    const email = user.email;
    this.confirmationService.confirm({
      message: `Are you sure that you want to delete ${email}?`,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.userService.delete(user.id).data.subscribe(() => {
          this.usersPage$ = this.userService.getAll();
          this.toastService.showToast(true, `User ${email}  deleted`, 'info');
        });
      },
    });
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

  edit(user: UserTableDto) {
    this.editedUser = structuredClone(user);
    this.setUserStatusesToUpdate();
    this.editUserDialog = true;
  }

  private setUserStatusesToUpdate() {
    const currentStatus = this.editedUser.status;
    const ACTIVE = UserStatus.ACTIVE;
    const SUSPENDED = UserStatus.SUSPENDED;
    const DEPROVISIONED = UserStatus.DEPROVISIONED;
    this.userStatusesToUpdate = [currentStatus];
    if (currentStatus !== DEPROVISIONED) {
      this.userStatusesToUpdate.push(DEPROVISIONED);
    }
    switch (currentStatus) {
      case UserStatus.STAGED:
        this.userStatusesToUpdate.push(UserStatus.PROVISIONED);
        break;
      case ACTIVE:
        this.userStatusesToUpdate.push(UserStatus.PASSWORD_EXPIRED, SUSPENDED);
        break;
      case UserStatus.RECOVERY:
      case UserStatus.LOCKED_OUT:
      case SUSPENDED:
        this.userStatusesToUpdate.push(ACTIVE);
        break;
    }
  }

  hideDialog() {
    this.editUserDialog = false;
  }

  save() {
    this.userService.update(this.editedUser).data.subscribe({
      next: (updatedUser) => {
        this.hideDialog();
        this.toastService.showToast(
          true,
          "User's been successfully updated",
          'success',
        );
      },
      error: (err) =>
        this.toastService.showToast(true, err.error.messages, 'error'),
    });
  }

  applyFilterGlobal($event: Event, matchmode: string) {
    const globalFilter = <HTMLInputElement>$event.target;
    this.usersTable.filterGlobal(globalFilter.value, matchmode);
  }

  assignUserPhone($event: Phone) {
    this.editedUser.phone = $event ? $event.internationalNumber : '';
  }
}
