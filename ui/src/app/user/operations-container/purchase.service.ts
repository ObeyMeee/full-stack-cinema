import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PurchaseDto } from './purchase.dto';
import { BaseService } from '../../shared/base.service';
import { isFuture } from 'date-fns';
import { map } from 'rxjs';
import { RequestStatusService } from '../../shared/pending/request-status.service';
import { Pending } from '../../shared/pending/pending.interface';

@Injectable({
  providedIn: 'root',
})
export class PurchaseService extends BaseService {
  private _purchaseDtos$!: Pending<PurchaseDto[]>;

  constructor(
    private http: HttpClient,
    requestStatusService: RequestStatusService,
  ) {
    super(requestStatusService);
  }

  getAllActive(): Pending<PurchaseDto[]> {
    const activePurchases$ = this.getAll().data.pipe(
      map((purchases) =>
        this.shallowCopyData(purchases).filter((p) =>
          isFuture(p.sessionStartAt),
        ),
      ),
    );
    return { data: activePurchases$, status: this._purchaseDtos$.status };
  }

  getAll() {
    if (!this._purchaseDtos$) {
      this.sendRequest();
    }
    return {
      data: this._purchaseDtos$.data.pipe(map(this.shallowCopyData)),
      status: this._purchaseDtos$.status,
    };
  }

  // Creating shallow copy of data to use totalPrice and quantity
  // because received JSON doesn't have these properties
  private shallowCopyData(purchases: PurchaseDto[]) {
    return purchases.map((p) => Object.assign(new PurchaseDto(), p));
  }

  private sendRequest() {
    const url = `${this.baseUrl}purchases/user`;
    const request = this.http.get<PurchaseDto[]>(url);
    this._purchaseDtos$ =
      this.requestStatusService.handleRequestWithStatus<PurchaseDto[]>(request);
  }
}
