import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let userid: string = "Nicola";
    let password: string = "123_Stella";

    let AuthHeader: string = " Basic " + window.btoa(userid+":"+ password);

    req = req.clone({
      setHeaders : {Authorization : AuthHeader}
    });

    return next.handle(req);
  }
}
