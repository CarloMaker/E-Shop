import { Component, OnInit } from '@angular/core';
import { IArticoli } from 'src/app/models/Articoli';
import { ArticoliService } from 'src/services/articoli.service';
import { EventEmitter } from 'stream';

@Component({
  selector: 'app-grid-articoli',
  templateUrl: './grid-articoli.component.html',
  styleUrls: ['./grid-articoli.component.css']
})
export class GridArticoliComponent implements OnInit {

  articoli$ : IArticoli[] = [];

  constructor(private articoliService  : ArticoliService ) { }

  ngOnInit(): void {

    this.articoli$ = this.articoliService.getArticoli();

  }

  handleDelete = (codart : string ) => {
    this.articoli$.splice(this.articoli$.findIndex( x => x.codart == codart),1);
    //alert("Cancellato " + codart);
  }

  handleEdit = (codart : string ) => {
    alert("Modificato " + codart);
  }
}
