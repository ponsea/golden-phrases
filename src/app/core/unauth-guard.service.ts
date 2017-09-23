import { Injectable } from '@angular/core';
import { CanActivate,
         Router,
         RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable()
export class UnauthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.userLoginedIn) {
      this.router.navigate(['/']);
      return false
    } else {
      return true
    }
  }
}

