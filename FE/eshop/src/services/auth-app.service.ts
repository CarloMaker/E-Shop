import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiMsg } from 'src/app/models/ApiMsg';

@Injectable({
  providedIn: 'root'
})
export class AuthAppService {
  
  server: string ="localhost"
  port: string = "5051"
  constructor(private httpClient : HttpClient) { }

  

  login = (userid :string , password :string ) : boolean =>{
    
    var retValue =  userid ==="user" && password==="";

    if(retValue){
      sessionStorage.setItem("Utente",userid)
    }
    return retValue;
  }

  loggedUser = () : string|null =>  (   sessionStorage.getItem("Utente")) ? sessionStorage.getItem("Utente") : "";

  isLogged = () : boolean => sessionStorage.getItem("Utente") ? true : false;

  logout() {
    sessionStorage.clear();
  }
}
