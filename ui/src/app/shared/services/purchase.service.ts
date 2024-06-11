import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PurchaseDto } from '../../user/operations-container/purchase.dto';
import { BaseService } from './base.service';
import { isFuture } from 'date-fns';
import { map } from 'rxjs';
import { RequestStatusService } from '../pending/request-status.service';
import { Pending } from '../pending/pending.interface';
import { PurchaseStatsDto } from '../../admin-panel/stats/purchase-stats.dto';

@Injectable({
  providedIn: 'root',
})
export class PurchaseService extends BaseService {
  private BASE_URL = `${this.baseUrl}purchases`;
  private _purchaseDtos$!: Pending<PurchaseDto[]>;

  constructor(
    private http: HttpClient,
    requestStatusService: RequestStatusService,
  ) {
    super(requestStatusService);
  }

  getAll(): Pending<PurchaseStatsDto[]> {
    const request = this.http.get<PurchaseStatsDto[]>(this.BASE_URL);
    return this.requestStatusService.handleRequestWithStatus<PurchaseStatsDto[]>(request)
  }

  getAllActiveByUser(): Pending<PurchaseDto[]> {
    const activePurchases$ = this.getAllByUser().data.pipe(
      map((purchases) =>
        this.shallowCopyData(purchases).filter((p) =>
          isFuture(p.sessionStartAt),
        ),
      ),
    );
    return { data: activePurchases$, status: this._purchaseDtos$.status };
  }

  getAllByUser() {
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
    const url = `${this.BASE_URL}/user`;
    const request = this.http.get<PurchaseDto[]>(url);
    this._purchaseDtos$ =
      this.requestStatusService.handleRequestWithStatus<PurchaseDto[]>(request);
  }
}
