import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';
import { CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SetHomeGuard implements CanActivate {
  constructor(
    private storageService: StorageService,
    private readonly router: Router
  ) {}

  public canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkIsAuthenticated();
  }

  private checkIsAuthenticated(): boolean {
    const visited = this.storageService.getFromLocalStorage('visited');
    if (visited) {
      this.router.navigate(['/new-design']);
      return false;
    } else {
      return true;
    }
  }
}
