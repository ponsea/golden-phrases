import { Injectable } from '@angular/core';
import { CanActivate,
         Router,
         RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.userLoginedIn) {
      return true
    } else {
      this.router.navigate(['/login', {from: state.url}]);
      return false
    }
  }
}
