import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import { ToastService } from '../../../shared/toast.service';

@Component({
  selector: 'app-profile-editor',
  templateUrl: './profile-editor.component.html',
  styleUrls: ['./profile-editor.component.scss']
})
export class ProfileEditorComponent implements OnInit, OnChanges {
  edited = false;
  editedValue!: any;
  genders!: { label: string, value: string }[];
  maxBirthDate = new Date();
  minBirthDate = new Date(1900, 0);
  isValueDate!: boolean;

  @Input({ required: true }) value: any;
  @Input({ required: true }) key!: string;
  @Input({ required: true }) labelValue!: string;
  @Input({ required: true }) labelIcon!: string;

  constructor(private userService: UserService,
              private toastService: ToastService) {
  }

  ngOnInit() {
    this.genders = [
      { label: 'Male', value: 'MALE' },
      { label: 'Female', value: 'FEMALE' }
    ];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value']) {
      const timestamp = Date.parse(this.value);
      this.isValueDate = Number.isFinite(timestamp);
    }
  }

  toggleEdited() {
    this.edited = !this.edited;
  }

  async update() {
    const field = { [this.key]: this.editedValue };
    this.userService.partialUpdate(field)
      .data.subscribe({
      next: this.handleSuccess.bind(this),
      error: this.handleFailure.bind(this)
    });
  }

  private handleSuccess() {
    this.value = this.editedValue;
    this.edited = false;
    this.toastService.showToast(true, 'Data\'s been updated successfully!', 'success');
  }

  private handleFailure(err: any) {
    const errors: string[] = err.error.messages;
    errors.forEach(e => this.toastService.showToast(true, e, 'error'));
  }
}
