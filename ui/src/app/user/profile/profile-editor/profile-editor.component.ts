import { Component, Input } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import { ToastService } from '../../../shared/toast.service';

@Component({
  selector: 'app-profile-editor',
  templateUrl: './profile-editor.component.html',
  styleUrls: ['./profile-editor.component.scss']
})
export class ProfileEditorComponent {
  edited = false;
  editedValue!: any;
  @Input({ required: true }) value: any;
  @Input({ required: true }) key!: string;
  @Input({ required: true }) labelValue!: string;
  @Input({ required: true }) labelIcon!: string;

  constructor(private userService: UserService,
              private toastService: ToastService) {
  }

  toggleEdited() {
    this.edited = !this.edited;
  }

  update() {
    const field = { [this.key]: this.editedValue };
    this.userService.partialUpdate(field)
      .data.subscribe({
      next: this.handleSuccess.bind(this),
      error: this.handleFailure.bind(this)
    });
  }

  private handleSuccess() {
    this.value = this.editedValue;
    this.toastService.showToast(true, 'Data\'s been updated successfully!', 'success');
  }

  private handleFailure(err: any) {
    this.toastService.showToast(true, err.error.message, 'error');
  }
}
