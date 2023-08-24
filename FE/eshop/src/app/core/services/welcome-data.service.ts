import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WelcomeDataService {

  constructor( private httpClient  : HttpClient) { }

  getWelcome = (inputNome : string) : Observable<Object> =>{
    return this.httpClient.get('http://localhost:8080/api/saluti/' +inputNome);
  }
}
