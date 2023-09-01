import { Component, OnInit } from '@angular/core';

import { ArticoliService } from 'src/services/data/articoli.service';
import { IArticoli } from 'src/app/models/Articoli';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, map, observable, of } from 'rxjs';
import { AuthJwtService } from 'src/services/authjwt.service';
import { Ruoli } from 'src/app/models/Ruoli';

@Component({
  selector: 'app-articoli',
  templateUrl: './articoli.component.html',
  styleUrls: ['./articoli.component.css']
})
export class ArticoliComponent implements OnInit {


  articoli$: IArticoli[]  = []
  errore: string ="";
  isAdmin : boolean = false;
  //pagination
  pagina : number = 1
  righe :number = 10

  filter$: Observable<string | null> = of("") ;
  filter :string|null ="";

  filterType: number = 0;
  codart: string ="";

  constructor(private articoliService: ArticoliService,private route: ActivatedRoute,private router: Router,private AuthService : AuthJwtService) { }

  ngOnInit(): void {

    this.isAdmin = true;this.AuthService.getRoles().includes(Ruoli.amministratore);

    this.filter$ = this.route.queryParamMap.pipe(
      map((params: ParamMap) => params.get('filter'))
    );
//STAMPA
    this.filter$.subscribe((value) => {
      console.log("new Filter" , value);
      this.filter = value;
  })

  if(this.filter){
    this.getArticoli(this.filter);
  }
  
    /*this.articoliService.getArticoloByDesc('Barilla')
      .subscribe({
          next: this.handleResponse.bind(this),
          error: this.handleError.bind(this)
      });*/
     
  }

  getArticoli = (filter: string) => {

    this.articoli$ = []; // a ogni filtro viene resettato l 'array

    if(this.filterType === 0 ){
      this.articoliService.getArticoliByCode(filter)
        .subscribe({
            next: this.handleResponse.bind(this),
            error: this.handleError.bind(this)
        });
    }else if(this.filterType === 1 ){
      this.articoliService.getArticoloByDesc(filter)
      .subscribe({
          next: this.handleResponse.bind(this),
          error: this.handleError.bind(this)
      });
    }else if(this.filterType === 2 ){
      this.articoliService.getArticoliByEan(filter)
        .subscribe({
            next: this.handleResponse.bind(this),
            error: this.handleError.bind(this)
        });
    }

  }
  handleResponse(response: any) {
   
    if (this.filterType === 0 || this.filterType === 2)
    {
      let newArray : IArticoli[] = [...this.articoli$, response];
      this.articoli$ = newArray;
    }
    else
    {
      this.articoli$ = response;
    }

    this.filterType = 0;

  }

  handleError(error: any) {
  
    if (this.filter && this.filterType === 0) {
      this.filterType = 1;
      this.getArticoli(this.filter);
    }
    else if (this.filter && this.filterType === 1) {
      this.filterType = 2;
      this.getArticoli(this.filter);
    }
    else {
      console.log(error);
      //this.errore = error.error.message; modificata da errorhandle interceptors
       this.errore= error;
      this.filterType = 0;
    }

  }

  refresh = () => {
    if(this.filter){
      this.getArticoli(this.filter);
    }
    
  }


  elimina=(codArt: string) =>{
    this.errore="";
    this.codart = codArt;
    console.log("Cancelling codArt " ,codArt);
    this.articoliService.delArticoloByCodArt(codArt).subscribe ( 
      {
        next: this.handleOkDelete.bind(this),
        error: this.handleErrDelete.bind(this)
      }      
    );
  }


  handleErrDelete(error:any){
    console.log("Errore" , error);
   // this.errore = error.error.message; modificata 
    this.errore = error;
  }
  
  handleOkDelete(error:any) {
    console.log( error);
    this.articoli$ = this.articoli$.filter( articolo => articolo.codArt !== this.codart)
    this.codart=""
  }

  modifica(codArt: string){
    this.router.navigate( ['gestart',codArt]);
  }
}

