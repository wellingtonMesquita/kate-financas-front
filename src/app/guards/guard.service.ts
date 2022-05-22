import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class GuardService {
  constructor(private tokenService: TokenService, private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.tokenService.getToken()) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
