import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PurchaseDto } from './purchase.dto';
import { BaseService } from '../../shared/base.service';
import { isFuture } from 'date-fns';
import { map, Observable } from 'rxjs';
import { RequestStatusService } from '../../shared/pending/request-status.service';

@Injectable({
  providedIn: 'root',
})
export class PurchaseService extends BaseService {
  private _purchaseDtos$: Observable<PurchaseDto[]> | undefined;

  // todo
  constructor(
    private http: HttpClient,
    requestStatusService: RequestStatusService,
  ) {
    super(requestStatusService);
  }

  getAll(): Observable<PurchaseDto[]> {
    if (!this._purchaseDtos$) {
      const url = `${this.baseUrl}purchases/user`;
      this._purchaseDtos$ = this.http.get<PurchaseDto[]>(url);
    }
    return this._purchaseDtos$;
  }

  getAllActive(): Observable<PurchaseDto[]> {
    return this.getAll().pipe(
      map((purchases) => purchases.filter((p) => isFuture(p.sessionStartAt))),
    );
  }
}
