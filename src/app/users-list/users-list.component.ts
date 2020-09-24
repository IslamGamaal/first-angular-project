import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { UserService } from '../_services';
import { User } from '../_models';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { LocalStorageService } from '../_services/local-storage.service';


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  pageCount: number;
  p: number = 1;
  limit: number = 5;
  public users: User[];
  public onlineUserId;
  constructor(private _userService:UserService, 
    private _authService:AuthService, 
    private router: Router,
    private localStorage: LocalStorageService) { }


  ngOnInit() {
    this.identifyOnlineUsers();
    this.getUsersCount();
    this.loadUsers();
  }
  
  logout(): void {
    this._authService.logout()
      .subscribe(() => {
        this.localStorage.removeToken();
        this.router.navigate(['/login']);
    });
  }

  pageChanged($event) {
    this.p = $event;
    this.loadUsers();
  }

  loadUsers() {
    this._userService.getUserByPage(this.p, this.limit).subscribe(data => {
      this.users = data.data;
      for(let user of this.users) {
        if(user.id === this.onlineUserId) {
          user.status = 'online';
        }
      }
    },err => {
      this.localStorage.removeToken();
      this.router.navigate(['/login']);
    })
  }

  identifyOnlineUsers() {
    this._userService.getAuthenticatedUser().subscribe(data => {
      this.onlineUserId = data.id;
    },
    err => {
      this.localStorage.removeToken();
      this.router.navigate(['/login']);
    })
  }

  getUsersCount() {
    this._userService.getCount().subscribe(data =>{
      this.pageCount = data;
    })
  }

  getAllUsers() {
    this._userService.getAll().subscribe(data => {
      this.users = data;
      for(let user of this.users) {
        if(user.id === this.onlineUserId) {
          user.status = 'online';
        }
      }
    },err => {
      this.localStorage.removeToken();
      this.router.navigate(['/login']);
    })
  }

}
