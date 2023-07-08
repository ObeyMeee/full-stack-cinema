import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private messageService: MessageService) {}

  showToast(
    closable: boolean,
    detail: string,
    severity: string,
    summary = severity[0].toUpperCase() + severity.slice(1),
  ) {
    this.messageService.add({ closable, severity, summary, detail });
  }
}
