import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss'],
})
export class AdminPanelComponent {
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'Users',
        icon: 'pi pi-user',
        routerLink: 'users'
      },
      {
        label: 'Films',
        icon: 'bi bi-camera-reels',
        routerLink: 'films',
        routerLinkActiveOptions: { exact: true }
      },
      {
        label: 'New film',
        icon: 'pi pi-plus',
        routerLink: ['films', 'new']
      }
    ];
  }
}
