import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProfileService } from '../services/profile';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  /**
   * @constructor
   * @param: {_profileSerive<ProfileService>}
   */
  constructor(
    private _router: Router,
    private _profileSerive: ProfileService) {
  }

  /**
   * @public
   * @param: {next<ActivatedRouteSnapshot>}
   * @param: {state<RouterStateSnapshot>}
   * @returns: {Observable<boolean> | Promise<boolean> | boolean}
   * @description: NA
   */

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }
}
