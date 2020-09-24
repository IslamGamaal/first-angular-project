import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { LocalStorageService } from '../_services/local-storage.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public form = {
    name: null,
    firstName: null, 
    lastName: null,
    email: null,
    password: null,
    password_confirmation: null
  }
  loading: boolean;
  errors: boolean;
  public errorMsg = null;

  constructor(
    private router: Router,
    private authService: AuthService,
    private localStorage: LocalStorageService
  ) {
    
  }

  ngOnInit(): void { }

  /**
   * Login the user based on the form values
   */
  signup(): void {
    this.loading = true;
    this.errors = false;
    this.authService.signup(this.form)
      .subscribe((res: any) => {
        this.localStorage.setToken(res.access_token);
        this.loading = false;
        this.router.navigate(['/users-list']);
      }, (err: any) => {
        this.loading = false;
        this.errors = true;
        this.errorMsg = err.error.errors;
      });
  }

}
