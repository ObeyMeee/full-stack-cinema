import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HallService} from "./hall.service";
import {Observable, Subscription} from "rxjs";
import {SessionBuyTicketDto} from "./session-buy-ticket.dto";

@Component({
  selector: 'app-hall',
  templateUrl: './hall.component.html',
  styleUrls: ['./hall.component.css']
})
export class HallComponent implements OnInit, OnDestroy {
  private routeSubscription!: Subscription;
  session$!: Observable<SessionBuyTicketDto>;
  constructor(private route: ActivatedRoute,
              private hallService: HallService) {
  }

  ngOnInit() {
    this.routeSubscription = this.route.params.subscribe(params =>
      this.session$ = this.hallService.getSession(params['sessionId'])
    );
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }

}
