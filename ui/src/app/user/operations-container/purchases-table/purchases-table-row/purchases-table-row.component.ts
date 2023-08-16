import { Component, Input } from '@angular/core';
import { PurchaseDto } from '../../purchase.dto';
import { openClosedAnimation } from '../../../../shared/animations';

@Component({
  selector: 'app-purchases-table-row',
  templateUrl: './purchases-table-row.component.html',
  styleUrls: ['./purchases-table-row.component.scss'],
  animations: [openClosedAnimation('translateY(0)', 'translateY(-20px)', 0.3)],
})
export class PurchasesTableRowComponent {
  @Input() purchase!: PurchaseDto;
  rowExpanded = false;

  toggleRowExpanded() {
    this.rowExpanded = !this.rowExpanded;
  }
}
