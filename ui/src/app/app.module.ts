import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {CarouselModule} from "primeng/carousel";
import {PosterComponent} from './poster/poster.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BlurDirective} from './poster/blur.directive';
import {Route, RouterModule} from "@angular/router";
import {FilmComponent} from './film/film.component';
import {HallComponent} from './hall/hall.component';
import {LoginComponent} from './login/login.component';
import {OktaAuthGuard, OktaAuthModule, OktaCallbackComponent} from "@okta/okta-angular";
import {environment} from "../environments/environment.development";
import OktaAuth from "@okta/okta-auth-js";
import {AuthInterceptorService} from "./auth/auth-interceptor.service";
import {HoverDirective} from './shared/hover.directive';
import {IconTextComponent} from './poster/icon-text/icon-text.component';
import {TooltipModule} from "primeng/tooltip";
import {UserComponent} from './user/user.component';
import {ProfileComponent} from './user/profile/profile.component';
import {TicketListComponent} from './user/ticket-list/ticket-list.component';
import {TransactionsTableComponent} from './user/ticket-list/transactions-table/transactions-table.component';
import {ConvertDateInterceptorService} from "./shared/convert-date-interceptor.service";

const routes: Route[] = [
  {path: '', component: PosterComponent, pathMatch: 'full'},
  {
    path: 'user',
    children: [
      {path: 'profile', component: ProfileComponent,},
      {path: 'tickets', component: TicketListComponent},
    ],
    canActivate: [OktaAuthGuard],
    component: UserComponent
  },
  {path: 'login', component: LoginComponent},
  {path: 'login/callback', component: OktaCallbackComponent},
  {path: 'films/:id', component: FilmComponent},
  {path: 'films/:id/sessions/:sessionId', component: HallComponent},
  {path: '**', component: PosterComponent}
]

const oktaAuth = new OktaAuth(environment.okta);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PosterComponent,
    BlurDirective,
    FilmComponent,
    HallComponent,
    LoginComponent,
    HoverDirective,
    IconTextComponent,
    UserComponent,
    ProfileComponent,
    TicketListComponent,
    TransactionsTableComponent
  ],
  imports: [
    BrowserModule,
    CarouselModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    OktaAuthModule.forRoot({oktaAuth}),
    TooltipModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ConvertDateInterceptorService, multi: true},
    OktaAuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
