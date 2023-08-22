import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PurchaseDto } from '../purchase.dto';
import { PurchaseService } from '../purchase.service';
import { Pending } from '../../../shared/pending/pending.interface';

@Component({
  selector: 'app-transactions-table',
  templateUrl: 'purchases-table.component.html',
  styleUrls: ['purchases-table.component.scss'],
})
export class PurchasesTableComponent implements OnChanges {
  @Input() sectionName!: string;
  @Input() noPurchasesMessage!: string;
  @Input() onlyActiveTickets!: boolean;
  purchases$!: Pending<PurchaseDto[]>;

  constructor(private purchaseService: PurchaseService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['onlyActiveTickets']) {
      this.purchases$ = this.onlyActiveTickets
        ? this.purchaseService.getAllActive()
        : this.purchaseService.getAll();
    }
  }
}
