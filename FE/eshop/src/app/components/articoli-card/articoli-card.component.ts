import { Component, EventEmitter, Input, OnInit, Output  } from '@angular/core';
import { IArticoli } from 'src/app/models/Articoli';
import { ArticoliService } from 'src/services/articoli.service';


@Component({
  selector: 'app-articoli-card',
  templateUrl: './articoli-card.component.html',
  styleUrls: ['./articoli-card.component.css']
})
export class ArticoliCardComponent implements OnInit {

  @Input()
  articolo : IArticoli={
    codart: '',
    descrizione: '',
    um: '',
    pzcart: 0,
    peso: 0,
    prezzo: 0,
    active: false,
    data: new Date(),
    imageUrl: ''
  };

  @Output()
  delete  = new EventEmitter();

  @Output()
  edit = new EventEmitter();

  constructor(private articoliService  : ArticoliService ) { }

  ngOnInit(): void {

    

  }


  editArticolo = () :void =>{
    this.edit.emit(this.articolo.codart);
  }

  deleteArticolo = () : void =>{
    this.delete.emit(this.articolo.codart);
  }
}
