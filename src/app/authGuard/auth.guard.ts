import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";

@Injectable({
    providedIn: 'root'
  })
  class PermissionsService {
  
    constructor(private router: Router) {}
  
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
        if(localStorage.getItem('_t_')){
            return true
        }else{
            this.router.navigate(['/'])
        }
    }
  }
  
  export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
    return inject(PermissionsService).canActivate(next, state);
  }