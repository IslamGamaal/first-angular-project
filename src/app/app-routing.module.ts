import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes} from '@angular/router'
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { UsersListComponent } from './users-list/users-list.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuardService } from './_services/auth-guard.service';
import { GuestGuardService } from './_services/guest-guard.service';

const appRoutes:Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [GuestGuardService]
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [GuestGuardService]
  },
  {
    path: 'users-list',
    component: UsersListComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'profile/:id',
    component: ProfileComponent,
    canActivate: [AuthGuardService]
  }, 
  {
    path: '',
    redirectTo: '/users-list',
    pathMatch: 'full'
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  declarations: []
})
export class AppRoutingModule { }
