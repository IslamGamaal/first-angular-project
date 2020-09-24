import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class GuestGuardService implements CanActivate {
  /**
   * Constructor
   * @param router The router object
   */
  constructor(
    private router: Router,
    private localStorage: LocalStorageService
  ) { }
  /**
   * Can activate function
   * @param next The activated route snapshot object
   * @param state The router state snapshot object
   */
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    if (!this.localStorage.getToken() || !this.localStorage.loggedIn()) { 
      return true; 
    }
    this.router.navigateByUrl('/users-list');
    return false;
  }
}