import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import {CarouselModule} from "primeng/carousel";
import { PosterComponent } from './poster/poster.component';
import {HttpClientModule} from "@angular/common/http";
import { BlurDirective } from './poster/blur.directive';
import {Route, RouterModule} from "@angular/router";
import { FilmComponent } from './film/film.component';

const routes: Route[] = [
  {path: '', component: PosterComponent, pathMatch: 'full'},
  {path: 'film/:id', component: FilmComponent},
  {path: '**', component: PosterComponent}
]
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PosterComponent,
    BlurDirective,
    FilmComponent
  ],
  imports: [
    BrowserModule,
    CarouselModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
