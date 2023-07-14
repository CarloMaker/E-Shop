import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthAppService {
  

  constructor() { }

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
