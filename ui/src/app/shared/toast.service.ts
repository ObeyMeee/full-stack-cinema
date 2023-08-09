import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { upperFirst } from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private messageService: MessageService) {}

  showToast(
    closable: boolean,
    detail: string,
    severity: string,
    summary = upperFirst(severity),
  ) {
    this.messageService.add({ closable, severity, summary, detail });
  }
}
