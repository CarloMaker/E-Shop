import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthJwtService } from './authjwt.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate {

  

  constructor(private Auth: AuthJwtService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state:  RouterStateSnapshot)  {

   let ruoli = this.Auth.getRoles();


  if (!this.Auth.isLogged()) {
      this.router.navigate(['login'], { queryParams: {nologged: true}});
      return false;
    } else {
      //se e' loggato devo determinare il ruolo
      let roles: string[]=[] ;
      roles = route.data['roles'] // sono quelli impostati su auth-routing
      let noRestriction : boolean = this.isNoRestriction(roles);
      
      if(noRestriction){
        return true;
      } else if  (ruoli.some( (element) => roles.includes(element))) // per ogni elemento controllo se e' dentro roles
      {
        return true;
      }else{
        this.router.navigate(['forbidden'])
        return false;
      }
        
        

    }
  }

  //la risorsa non ha specificato un ruolo particolare in Auth-Routing
  isNoRestriction(roles: string[]): boolean {
   if(roles === null || roles.length == 0 ){
    return true;
   }
   return false;
  }
  
}
