import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { ApiMsg } from 'src/app/models/ApiMsg';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

//// BASIC AUTENTICATION
export class AuthappService {
  
  server: string =environment.server
  port: string = environment.port

  constructor(private httpClient : HttpClient) { }


  autenticaService(userid :string , password :string){

    let authString : string = "Basic " + window.btoa(userid+":"+password);

    let headers = new HttpHeaders(
      {Authorization:authString} //btoa > Base64
    );

    return this.httpClient.get<ApiMsg>(`http://${this.server}:${this.port}/api/articoli/test`,{headers}).pipe(
      map(
        data => {
          sessionStorage.setItem("Utente",userid); //contestualmente regista il session storage
          sessionStorage.setItem("AuthToken", authString);
          return data;
        }
      )
    );
  }

  autentica = (userid: string, password: string) : boolean => {
    var retVal = (userid === 'Nicola' && password === '123_Stella') ? true : false;

    if (retVal) {
      sessionStorage.setItem("Utente",userid);
    }

    return retVal;
  }

  loggedUser = (): string | null => (sessionStorage.getItem("Utente")) ? sessionStorage.getItem("Utente") : "";

  isLogged = (): boolean => (sessionStorage.getItem("Utente")) ? true : false;

  clearUser = (): void => sessionStorage.removeItem("Utente");

  clearAll = (): void => sessionStorage.clear();
}
