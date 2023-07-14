import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthAppService } from 'src/services/auth-app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userId : string ="user";
  password : string="";
  autenticato : boolean = true;
  errMessage : string ="Attenzione , userid e/o password errati";


  titolo: string = "Accesso & Autenticazione";
  sottoTitolo: string="Procedi a inserire user e password...";
  constructor(private route :Router,private BasicAuth : AuthAppService) { }

  ngOnInit(): void {
  }

  appAuth = () : void =>{

    if(this.BasicAuth.login(this.userId,this.password) ) {
      this.autenticato  = true;
      this.route.navigate(['welcome',this.userId]);
    }else{
      this.autenticato = false;
    }
    
  }

  

}
