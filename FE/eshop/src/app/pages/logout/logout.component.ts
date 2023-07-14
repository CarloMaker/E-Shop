import { Component, OnInit } from '@angular/core';
import { AuthAppService } from 'src/services/auth-app.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private AuthService: AuthAppService) { }

  ngOnInit(): void {
    console.log("LogOut");
    this.AuthService.logout();
  }

}
