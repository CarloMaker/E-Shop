import { RouterModule, Routes } from '@angular/router';

import { ArticoliComponent } from './pages/articoli/articoli.component';
import { ErrorComponent } from './pages/error/error.component';
import { GridArticoliComponent } from './pages/grid-articoli/grid-articoli.component';
import { LoginComponent } from './pages/login/login.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { NgModule } from '@angular/core';
import { RegistrazioneComponent } from './pages/registrazione/registrazione.component';
import { RouteGuardService } from '../services/route-guard.service';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { GestartComponent } from './pages/gestart/gestart.component';
import { Ruoli } from './models/Ruoli';
import { ForbiddenComponent } from './pages/forbidden/forbidden.component';

const routes: Routes = [
  {path:'', component: LoginComponent},
  {path:'login', component: LoginComponent},
  {path:'signup', component : RegistrazioneComponent},
  {path:'welcome/:userid', component: WelcomeComponent, canActivate:[RouteGuardService],data:{roles:[Ruoli.utente]}}, //vincolo per utente
  {path:'articoli', component : ArticoliComponent, canActivate:[RouteGuardService],data:{roles:[Ruoli.utente]}}, //vincolo per utente
  {path:'articoli/grid', component : GridArticoliComponent, canActivate:[RouteGuardService],data:{roles:[Ruoli.utente]}}, //vincolo per utente
  {path:'gestart/:codart', component : GestartComponent, canActivate:[RouteGuardService],data:{roles:[Ruoli.amministratore]}}, //modifica articolo vincolo per utente
  {path:'gestart', component : GestartComponent, canActivate:[RouteGuardService],data:{roles:[Ruoli.amministratore]}}, //inserimento articolo vincolo per utente
  {path:'logout', component : LogoutComponent},
  {path:'forbidden', component : ForbiddenComponent},  
  {path:'**', component: ErrorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
