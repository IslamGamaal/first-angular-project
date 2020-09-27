import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private iss = {
    login: 'http://localhost:8001/api/login',
    signup: 'http://localhost:8001/api/signup'
  };

  constructor() { }

  setToken(token) {
    localStorage.setItem('access_token', token);
  }
  getToken() {
    return localStorage.getItem('access_token');
  }

  removeToken() {
    localStorage.removeItem('access_token');
  }

  isValidToken() {
    const token = this.getToken();
    if (token) {
      const payload = this.payloadToken(token);
      if (payload) {
        return Object.values(this.iss).indexOf(payload.iss) > -1 ? true : false;
      }
    }
    return false;
  }

  private payloadToken(token) {
    const payload = token.split('.')[1];
    return this.decodeToken(payload);
  }

  private decodeToken(payload) {
    var decodedToken;
    try {
      decodedToken = JSON.parse(atob(payload));
      return decodedToken;
    } catch (error) {
      return null;
    }
  }

  loggedIn() {
    return this.isValidToken();
  }
}
