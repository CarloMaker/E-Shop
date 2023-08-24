import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WelcomeDataService } from '../core/services/welcome-data.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  utente : string ="";
  titolo: string = "Welcome To E-Shop";
  sottoTitolo: string="Naviga tra le offerte";
  constructor(private route : ActivatedRoute ,private welcomeDataService : WelcomeDataService ) { }
  welcome : string="";

  ngOnInit(): void {
    this.utente = this.route.snapshot.params['userid'];
    
  }

  getWelcome = () : void => {
  
      this.welcomeDataService.getWelcome('Marco').subscribe({
        next : res => this.welcome = res.toString(),
        error :res => {
          console.log(res);
          this.welcome = res.error.message.toString()
        },

      }
        
      )
    
  }
}
