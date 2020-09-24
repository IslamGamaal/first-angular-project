import { BrowserModule } from '@angular/platform-browser';
import { NgModule, OnInit } from '@angular/core';
import { ReactiveFormsModule }    from '@angular/forms';
import { FormsModule } from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { UsersListComponent } from './users-list/users-list.component';
import { ProfileComponent } from './profile/profile.component';
import { NgxPaginationModule } from 'ngx-pagination';

import { UserService } from './_services';

import { RouterModule } from '@angular/router';
import { AuthGuardService } from './_services/auth-guard.service';
import { LoginComponent } from './login/login.component';
import { AuthService } from './_services/auth.service';
import { AuthInterceptor } from './_services/auth.interceptor';
import { SignupComponent } from './signup/signup.component';
import { AppRoutingModule } from './app-routing.module';
import { LocalStorageService } from './_services/local-storage.service';

@NgModule({
  declarations: [
    AppComponent,
    UsersListComponent,
    ProfileComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    NgxPaginationModule,
  ],
  providers: [
    UserService,
    AuthService,
    AuthGuardService,
    LocalStorageService,
    {
      provide : HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi   : true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }

