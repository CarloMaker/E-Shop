import { IArticoli, ICat, IIva } from 'src/app/models/Articoli';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ApiMsg } from 'src/app/models/ApiMsg';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticoliService {

  server: string =environment.server
  port: string = environment.port
 
  constructor(private httpClient : HttpClient) { }

  //getArticoli = () : IArticoli[] => this.articoli;

  getArticoloByDesc = (descrizione : string ) => {

    

    return this.httpClient.get<IArticoli[]>(`http://${this.server}:${this.port}/api/articoli/cerca/descrizione/${descrizione}`)
    .pipe(
      map(response => {
         response.forEach(item => {
            item.desStatoArt  = this.getDesStatoArt(item.idStatoArt);
          
         }); 
         return response;
      })
    );
      
  }   


  getDesStatoArt(idStato: string): string {
    
    if(idStato ==='1')
      return 'Attivo';
    if(idStato ==='2')
      return  "Sospeso"
    return "Eliminato"
  }



  getArticoliByCode = (codart: string) => {

    return this.httpClient.get<IArticoli>(`http://${this.server}:${this.port}/api/articoli/cerca/codice/${codart}`)
    .pipe(
      map( resp => {
        resp.desStatoArt = this.getDesStatoArt(resp.idStatoArt)
        return resp
      })       
    )
  }

  getArticoliByEan = (barcode: string) => {

    return this.httpClient.get<IArticoli>(`http://${this.server}:${this.port}/api/articoli/cerca/barcode/${barcode}`)
    .pipe(
      map( resp => {
        resp.desStatoArt = this.getDesStatoArt(resp.idStatoArt)
        return resp
      })       
    )
  }

 delArticoloByCodArt = (codart: string) :Observable<string> => {
      return this.httpClient.delete<string>(`http://${this.server}:${this.port}/api/articoli/elimina/${codart}`);
 }



 getIva = () => this.httpClient.get<IIva[]> (`http://${this.server}:${this.port}/api/iva`);

 getCat = () => this.httpClient.get<ICat[]> (`http://${this.server}:${this.port}/api/cat`);


 updateArticolo = ( articolo : IArticoli)   => {
     return this.httpClient.put<ApiMsg>(`http://${this.server}:${this.port}/api/articoli/modifica`,articolo);
 }
 


 insertArticolo = ( articolo : IArticoli)   => {
     return this.httpClient.post<ApiMsg>(`http://${this.server}:${this.port}/api/articoli/inserisci`,articolo);
 }
}
