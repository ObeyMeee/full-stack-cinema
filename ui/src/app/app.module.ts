import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import {CarouselModule} from "primeng/carousel";
import { PosterComponent } from './poster/poster.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PosterComponent
  ],
  imports: [
    BrowserModule,
    CarouselModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
