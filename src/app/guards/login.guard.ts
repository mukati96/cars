import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  public canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
     if(state.url!='/login'){
      if(state.url.split('?')[0] === "/login") {
        localStorage.setItem('queryEmail',state.url.split('?')[1].split('&')[0].split('=')[1])
        localStorage.setItem('queryToken',state.url.split('?')[1].split('&')[1].split('=')[1])
      } 
     }
      
    return this.checkIsAuthenticated();
  }

  private checkIsAuthenticated(): boolean {
    const isAuth: boolean = this.authService.checkAuthentication();
    if (!isAuth) {
      return true;
    } else {
      this.router.navigate(['/my-account/mycar']);
      return false;
    }
  }
}
