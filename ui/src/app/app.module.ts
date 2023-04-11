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
import {OktaAuthModule, OktaCallbackComponent} from "@okta/okta-angular";
import {environment} from "../environments/environment.development";
import OktaAuth from "@okta/okta-auth-js";
import {AuthInterceptorService} from "./auth/auth-interceptor.service";

const routes: Route[] = [
  {path: '', component: PosterComponent, pathMatch: 'full'},
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
    LoginComponent
  ],
  imports: [
    BrowserModule,
    CarouselModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    OktaAuthModule.forRoot({oktaAuth}),
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
