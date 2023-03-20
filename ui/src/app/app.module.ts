import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import {CarouselModule} from "primeng/carousel";
import { PosterComponent } from './poster/poster.component';
import {HttpClientModule} from "@angular/common/http";
import { BlurDirective } from './poster/blur.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PosterComponent,
    BlurDirective
  ],
  imports: [
    BrowserModule,
    CarouselModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
