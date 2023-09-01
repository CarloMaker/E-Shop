import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'console';
import { ApiMsg } from 'src/app/models/ApiMsg';
import { IArticoli, ICat, IIva } from 'src/app/models/Articoli';
import { ArticoliService } from 'src/services/data/articoli.service';

@Component({
  selector: 'app-gestart',
  templateUrl: './gestart.component.html',
  styleUrls: ['./gestart.component.css']
})
export class GestartComponent implements OnInit {

  title : string = "Modifica Articoli";
  isModifica: boolean=false;
  codArt: string = ''

  articolo: IArticoli = {
    codArt: '',
    descrizione: '',
    um: 'PZ',
    codStat: '',
    pzCart: 0,
    pesoNetto: 0,
    prezzo: 0,
    idStatoArt: '1',
    desStatoArt: '',
    dataCreazione: new Date(),
    imageUrl: '',
    iva: {idIva: -1, descrizione: '', aliquota: 0 },
    famAssort: {id : -1, descrizione: ''},
    barcode: []
  };

  ListIva: IIva[] = [];
  ListCat: ICat[] = [];
  Ean : string =''
  apiMsg!: ApiMsg;
  conferma : string = ''
  errorMsg : string = ''

  constructor(private route : ActivatedRoute,private articoliService : ArticoliService,private router: Router) { }

  ngOnInit(): void {
     this.codArt =  this.route.snapshot.params['codart'];
     console.log(this.codArt);

     if(this.codArt){
      this.title = 'Modifica Articolo';
      this.isModifica = true;
      this.articoliService.getArticoliByCode(this.codArt).subscribe({
        next: this.handleResponse.bind(this),
        error: this.handleError.bind(this)
      })
    }else{
      this.title = 'Inserimento Articolo';
      this.isModifica= false;
    }

     this.articoliService.getCat().subscribe(
       response => {
          this.ListCat = response;
       }
     )

     this.articoliService.getIva().subscribe(
        response => {
          this.ListIva = response;
        }
     )


  };

  handleResponse( response: any){
    this.articolo = response;
    console.log(response);
    this.Ean = this.articolo.barcode.length > 0  ? this.articolo.barcode[0].barcode : 'NA';
  }

  handleError (error : any ){
    console.log(error) ;
  }

  salva (){
    console.log(this.articolo);
    this.conferma = this.errorMsg = '';
    if(this.isModifica){
        this.articoliService.updateArticolo(this.articolo).subscribe({
          next: ( response ) => {
            this.apiMsg = response;
            this.conferma = this.apiMsg.message;
            console.log(response.message);
          },
          error: (error) =>{
            this.apiMsg = error.error;
            this.errorMsg =error;
          }
      }) 
    }else{
      this.articoliService.insertArticolo(this.articolo).subscribe({
        next: ( response ) => {
          this.apiMsg = response;
          this.conferma = this.apiMsg.message;
          console.log(response.message);
        },
        error: (error) =>{
          this.apiMsg = error.error;
          this.errorMsg = error;
        }
    }) 
    }
  }

  abort(){
    if(this.isModifica){
      this.router.navigate(['articoli'],{queryParams : {filter : this.codArt}})
    }else{
      this.router.navigate(['articoli'])
    }
  }
}
