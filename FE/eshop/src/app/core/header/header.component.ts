import { Component, OnInit } from '@angular/core';
import { AuthAppService } from 'src/services/auth-app.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public AuthService : AuthAppService) { }

  ngOnInit(): void {
  }

}
