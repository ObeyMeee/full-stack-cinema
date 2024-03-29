import { inject, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CarouselModule } from 'primeng/carousel';
import { PosterComponent } from './poster/poster.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { Route, RouterModule } from '@angular/router';
import { FilmComponent } from './film/film.component';
import { HallComponent } from './hall/hall.component';
import { LoginComponent } from './login/login.component';
import { OktaAuthGuard, OktaAuthModule, OktaCallbackComponent } from '@okta/okta-angular';
import { AuthInterceptorService } from './interceptor/auth-interceptor.service';
import { TooltipModule } from 'primeng/tooltip';
import { UserComponent } from './user/user.component';
import { ProfileComponent } from './user/profile/profile.component';
import { OperationsContainerComponent } from './user/operations-container/operations-container.component';
import { PosterElementComponent } from './poster/poster-element/poster-element.component';
import { TicketComponent } from './hall/ticket/ticket.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SafeUrlPipe } from './shared/pipes/safe-url.pipe';
import { TrailerComponent } from './shared/trailer/trailer.component';
import { EmailDirective } from './sign-up/validators/email.directive';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { HasUpperCaseDirective } from './sign-up/validators/has-upper-case.directive';
import { HasLowerCaseDirective } from './sign-up/validators/has-lower-case.directive';
import { HasNumericDirective } from './sign-up/validators/has-numeric.directive';
import { MessagesModule } from 'primeng/messages';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { FieldsetModule } from 'primeng/fieldset';
import { RatingModule } from 'primeng/rating';
import { FilmInfoComponent } from './film/film-info/film-info.component';
import { FilmCommentsComponent } from './film/film-comments/film-comments.component';
import { MessageModule } from 'primeng/message';
import { PaginatorModule } from 'primeng/paginator';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { NgOptimizedImage } from '@angular/common';
import { ConvertDateInterceptorService } from './interceptor/convert-date-interceptor.service';
import { AdminGuard } from './guard/admin-guard.service';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { UsersManagingComponent } from './admin-panel/users-managing/users-managing.component';
import { TableModule } from 'primeng/table';
import { RippleModule } from 'primeng/ripple';
import { StyleClassModule } from 'primeng/styleclass';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TagModule } from 'primeng/tag';
import { KeyFilterModule } from 'primeng/keyfilter';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { DateDropdownComponent } from './shared/date-dropdown/date-dropdown.component';
import { LoadingComponent } from './shared/loading/loading.component';
import { FilmCommentComponent } from './film/film-comments/film-comment/film-comment.component';
import { PurchasesTableComponent } from './user/operations-container/purchases-table/purchases-table.component';
import {
  PurchasesTableRowComponent
} from './user/operations-container/purchases-table/purchases-table-row/purchases-table-row.component';
import { GoogleLoginProvider, SocialLoginModule } from 'angularx-social-login';
import { SkeletonModule } from 'primeng/skeleton';
import OktaAuth from '@okta/okta-auth-js';
import { environment } from '../environments/environment.development';
import { CalendarModule } from 'primeng/calendar';
import { ProfileEditorComponent } from './user/profile/profile-editor/profile-editor.component';
import { EmailErrorMessagesComponent } from './shared/email-error-message/email-error-messages.component';
import { RangePipe } from './shared/pipes/range.pipe';
import { PasswordErrorMessagesComponent } from './shared/password-error-messages/password-error-messages.component';
import { FilmsManagingComponent } from './admin-panel/films-managing/films-managing.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { NewFilmComponent } from './admin-panel/new-film/new-film.component';
import { StepsModule } from 'primeng/steps';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FileUploadModule } from 'primeng/fileupload';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { DataViewModule } from 'primeng/dataview';

const routes: Route[] = [
  { path: '', component: PosterComponent, pathMatch: 'full' },
  {
    path: 'user',
    children: [
      { path: 'profile', component: ProfileComponent },
      { path: 'tickets', component: OperationsContainerComponent },
    ],
    canActivate: [OktaAuthGuard],
    component: UserComponent,
  },
  {
    path: 'films/:id',
    children: [
      { path: 'info', component: FilmInfoComponent },
      { path: 'comments', component: FilmCommentsComponent },
    ],
    component: FilmComponent,
  },
  { path: 'films/:id/sessions/:sessionId', component: HallComponent },
  { path: 'login', component: LoginComponent },
  { path: 'login/callback', component: OktaCallbackComponent },
  { path: 'register', component: SignUpComponent },
  {
    path: 'admin',
    component: AdminPanelComponent,
    canActivate: [OktaAuthGuard, () => inject(AdminGuard).canActivate()],
    children: [
      { path: 'users', component: UsersManagingComponent },
      { path: 'films', component: FilmsManagingComponent },
      { path: 'films/new', component: NewFilmComponent }
    ]
  },
  { path: '**', component: PosterComponent }
];

const oktaAuth = new OktaAuth(environment.okta);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PosterComponent,
    FilmComponent,
    HallComponent,
    LoginComponent,
    UserComponent,
    ProfileComponent,
    OperationsContainerComponent,
    PurchasesTableComponent,
    PosterElementComponent,
    TicketComponent,
    SignUpComponent,
    SafeUrlPipe,
    TrailerComponent,
    EmailDirective,
    HasUpperCaseDirective,
    HasLowerCaseDirective,
    HasNumericDirective,
    FilmInfoComponent,
    FilmCommentsComponent,
    AdminPanelComponent,
    UsersManagingComponent,
    DateDropdownComponent,
    LoadingComponent,
    FilmCommentComponent,
    FilmCommentComponent,
    PurchasesTableRowComponent,
    ProfileEditorComponent,
    EmailErrorMessagesComponent,
    RangePipe,
    PasswordErrorMessagesComponent,
    FilmsManagingComponent,
    NewFilmComponent
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CarouselModule,
        HttpClientModule,
        RouterModule.forRoot(routes),
        OktaAuthModule.forRoot({ oktaAuth }),
        TooltipModule,
        FormsModule,
        PasswordModule,
        DividerModule,
        MessagesModule,
        ProgressSpinnerModule,
        ToastModule,
        FieldsetModule,
        RatingModule,
        MessageModule,
        PaginatorModule,
        InputTextareaModule,
        ButtonModule,
        DialogModule,
        NgOptimizedImage,
        TableModule,
        RippleModule,
        StyleClassModule,
        InputTextModule,
        ConfirmDialogModule,
        TagModule,
        KeyFilterModule,
        NgxIntlTelInputModule,
        SkeletonModule,
        SocialLoginModule,
        CalendarModule,
        TabMenuModule,
        ReactiveFormsModule,
        StepsModule,
        AutoCompleteModule,
        FileUploadModule,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideStorage(() => getStorage()),
        DataViewModule
    ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ConvertDateInterceptorService,
      multi: true,
    },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: true, //keeps the user signed in
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '510764604889-udcm1ijpoob6a78cqvuuot0suddmbtqr.apps.googleusercontent.com',
              { scope: 'email', plugin_name: 'andromeda-cinema' }
            )
          }
        ]
      }
    },
    MessageService,
    OktaAuthGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
