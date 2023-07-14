import { Component, OnInit } from '@angular/core';
import { IArticoli } from '../../models/Articoli';
import { ArticoliService } from 'src/services/articoli.service';

@Component({
  selector: 'app-articoli',
  templateUrl: './articoli.component.html',
  styleUrls: ['./articoli.component.css']
})
export class ArticoliComponent implements OnInit {

  articoli: IArticoli[] = []


  constructor(private articoliService : ArticoliService) { }

  ngOnInit(): void {
    this.articoli = this.articoliService.getArticoli();
  }

}
