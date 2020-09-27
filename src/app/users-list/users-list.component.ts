import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { UserService } from '../_services';
import { User } from '../_models';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { LocalStorageService } from '../_services/local-storage.service';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  pageCount: number;
  p: number = 1;
  limit: number = 5;
  searchQuery = new FormControl('');
  public users?: User[];
  public onlineUserId;
  constructor(private _userService:UserService, 
    private _authService:AuthService, 
    private router: Router,
    private localStorage: LocalStorageService) { }


  ngOnInit() {
    this.loadUsers();
    this.identifyOnlineUsers();
  }

  logout(): void {
    this._authService.logout()
      .subscribe(() => {
        this.localStorage.removeToken();
        this.router.navigate(['/login']);
    });
  }

  searchUsers() {
    if(this.searchQuery.value.trim() === "") {
      this.loadUsers();
      return;
    }
    this._userService.searchUsers(this.searchQuery.value.trim(), this.p, this.limit).subscribe(data => {
      this.users = data.data;
      this.p = data.current_page;
      this.pageCount = data.total;
    });
  }

  pageChanged($event) {
    this.p = $event;
    if(this.searchQuery.value.trim() === "")
      this.loadUsers();
    else
      this.searchUsers();
  }

  loadUsers() {
    this._userService.getUsersByPage(this.p, this.limit).subscribe(data => {
      this.users = data.data;
      this.pageCount = data.total;
      this.p = data.current_page;
      for(let user of this.users) {
        if(user.id === this.onlineUserId) {
          user.status = 'online';
        }
      }
    })
  }

  identifyOnlineUsers() {
    this._userService.getAuthenticatedUser().subscribe(data => {
      this.onlineUserId = data.id;
    })
  }
  
  // err => {
  //   this.localStorage.removeToken();
  //   this.router.navigate(['/login']);
  // }

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
