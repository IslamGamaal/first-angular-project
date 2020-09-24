import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Variables
  loginUrl = 'http://localhost:8001/api/login';
  signupUrl = 'http://localhost:8001/api/signup';
  apiUrl = 'http://localhost:8001/api';
  options: any;
  /**
   * Constructor
   * @param http The http client object
   */
  constructor(
    private http: HttpClient
  ) {
    this.options = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json'
      })
    };
  }

  login(form) {
    return this.http.post(this.loginUrl, form, this.options);
  }

  signup(form) {
    form.name = form.firstName + " " + form.lastName;
    return this.http.post(this.signupUrl, form, this.options);
  }

  logout() {
    return this.http.post(this.apiUrl + '/logout', this.options);
  }

  public getToken() {
    return localStorage.getItem('access_token');
  }
}