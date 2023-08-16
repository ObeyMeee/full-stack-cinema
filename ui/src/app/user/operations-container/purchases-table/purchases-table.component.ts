import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { PurchaseDto } from '../purchase.dto';
import { PurchaseService } from '../purchase-service';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-transactions-table',
  templateUrl: 'purchases-table.component.html',
  styleUrls: ['purchases-table.component.scss'],
})
export class PurchasesTableComponent implements OnChanges, OnInit {
  @Input() sectionName!: string;
  @Input() noPurchasesMessage!: string;
  @Input() onlyActiveTickets!: boolean;
  purchases$!: Observable<PurchaseDto[]>;

  constructor(private purchaseService: PurchaseService) {}

  ngOnInit() {
    this.purchases$ = this.purchaseService.getAll().pipe(
      // creating copy to use totalPrice and quantity because received JSON doesn't have these properties
      map((purchases) =>
        purchases.map((a) => Object.assign(new PurchaseDto(), a)),
      ),
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['onlyActiveTickets']) {
      this.purchases$ = this.onlyActiveTickets
        ? this.purchaseService.getAllActive()
        : this.purchaseService.getAll();
    }
  }

  protected readonly print = print;
}
