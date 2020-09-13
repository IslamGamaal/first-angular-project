import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../_services';
import { Observable } from 'rxjs';
import { User } from '../_models';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  private currentUserId : number;
  public user;

  constructor(private _Activatedroute:ActivatedRoute, private _userService: UserService) {
  }

  ngOnInit() {
    this.currentUserId = parseInt(this._Activatedroute.snapshot.paramMap.get("id"));
    this._userService.getById(this.currentUserId).subscribe((data=> {
      this.user = data;
      console.log(data);
    }))
  }

}
