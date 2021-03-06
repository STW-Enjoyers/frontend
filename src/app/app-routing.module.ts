import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {FiltradorNotasComponent} from "./pages/filtrador-notas/filtrador-notas.component";
import {ListaCarrerasComponent} from "./pages/lista-carreras/lista-carreras.component";
import {MapaErasmusComponent} from "./pages/mapa-erasmus/mapa-erasmus.component";
import {RegistroComponent} from "./pages/registro/registro.component";
import {LoginComponent} from "./pages/login/login.component";
import {AjustesUsuarioComponent} from "./pages/ajustes-usuario/ajustes-usuario.component";
import {PerfilCarreraComponent} from "./pages/perfil-carrera/perfil-carrera.component";
import { InfoNotasComponent } from './pages/info-notas/info-notas.component';
import { InfoErasmusComponent } from './pages/info-erasmus/info-erasmus.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import {ServerErrorComponent} from "./pages/server-error/server-error.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'login', component: LoginComponent},
  {path: 'filtrador-notas', component: FiltradorNotasComponent},
  {path: 'lista-carreras', component: ListaCarrerasComponent},
  {path: 'mapa-erasmus', component: MapaErasmusComponent},
  {path: 'ajustes-usuario', component: AjustesUsuarioComponent},
  {path: 'perfil-carrera/:id', component: PerfilCarreraComponent},
  {path: 'info-notas', component: InfoNotasComponent},
  {path: 'info-erasmus', component: InfoErasmusComponent},
  {path: 'admin-dashboard', component: AdminDashboardComponent},
  {path: 'server-error', component: ServerErrorComponent},


  //Wild Card Route for 404 request
  {path: '**', pathMatch: 'full', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
