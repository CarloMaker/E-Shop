import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthAppService } from './auth-app.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate{

  constructor(private AuthService : AuthAppService,private route : Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree>  {
    
    if(! this.AuthService.isLogged()){
      this.route.navigate(["login"]);
     
    }
    return  this.AuthService.isLogged();
  }
}
