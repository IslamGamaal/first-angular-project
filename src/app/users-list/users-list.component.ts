import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { UserService } from '../_services';
import { User } from '../_models';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  
  public users: User[];
  public onlineUserId;
  constructor(private _userService:UserService, private _authService:AuthService, private router: Router) { }

  logout(): void {
    localStorage.removeItem('access_token');
    this.router.navigate(['/login']);
    this._authService.logout()
      .subscribe(() => {
        localStorage.removeItem('access_token');
        this.router.navigate(['/login']);
    });
  }

  ngOnInit() {


    this._userService.getAuthenticatedUser().subscribe((data => {
      this.onlineUserId = data.id;
    }))

    this._userService.getAll().subscribe((data => {
      this.users = data;
      for(let user of this.users) {
        if(user.id === this.onlineUserId) {
          user.status = 'online';
        }
      }
    }))


    

  }
}
