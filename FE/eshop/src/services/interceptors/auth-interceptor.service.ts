import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthappService } from '../authapp.service';
import { AuthJwtService } from '../authjwt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authService : AuthJwtService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    
    
    let  authHeader = this.authService.getAuthToken();
    
    if(this.authService.isLogged()){
      req = req.clone({
        setHeaders : {Authorization : authHeader}
      });
    }
    

    return next.handle(req);
  }
}
