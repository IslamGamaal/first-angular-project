import { BrowserModule } from '@angular/platform-browser';
import { NgModule, OnInit } from '@angular/core';
import { ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClient } from '@angular/common/http'
import { AppComponent } from './app.component';
import { UsersListComponent } from './users-list/users-list.component';
import { ProfileComponent } from './profile/profile.component';

import { UserService } from './_services';

import { RouterModule } from '@angular/router';
import { AuthGuardService } from './_services/auth-guard.service';
import { LoginComponent } from './login/login.component';
import { GuestGuardService } from './_services/guest-guard.service';
import { AuthService } from './_services/auth.service';
import { AuthInterceptor } from './_services/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    UsersListComponent,
    ProfileComponent,
    LoginComponent
  ],
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    RouterModule.forRoot([
      { path: 'users-list', component: UsersListComponent, canActivate: [ AuthGuardService ] },
      { path: 'profile/:id', component: ProfileComponent, canActivate: [ AuthGuardService ] },
      { path: '', pathMatch: 'full' ,redirectTo:'users-list', canActivate: [ AuthGuardService ]},
      { path: 'login', component: LoginComponent, canActivate: [ GuestGuardService ] }
    ]),
  ],
  providers: [
    UserService,
    AuthService,
    AuthGuardService,
    {
      provide : HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi   : true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }

