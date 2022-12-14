import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  UrlSegment,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements  CanActivate, CanActivateChild, CanLoad {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  public canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkIsAuthenticated();
  }

  public canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkIsAuthenticated();
  }

  public canLoad(route: Route, segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkIsAuthenticated();
  }

  private checkIsAuthenticated(): boolean {
    const isAuth: boolean = this.authService.checkAuthentication();
    if (isAuth) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

}
