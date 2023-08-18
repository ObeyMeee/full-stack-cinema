import { Component, Input } from '@angular/core';
import { Status } from '../pending/status.enum';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent {
  @Input() collection!: string;
  @Input() status$!: Observable<Status>;
  @Input() labelShown = true;
  protected readonly Status = Status;
}
