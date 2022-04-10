import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {FiltradorNotasComponent} from "./pages/filtrador-notas/filtrador-notas.component";
import {ListaCarrerasComponent} from "./pages/lista-carreras/lista-carreras.component";
import {MapaErasmusComponent} from "./pages/mapa-erasmus/mapa-erasmus.component";
import {RegistroComponent} from "./pages/registro/registro.component";
import {LoginComponent} from "./pages/login/login.component";
import {AjustesUsuarioComponent} from "./pages/ajustes-usuario/ajustes-usuario.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'login', component: LoginComponent},
  {path: 'filtrador-notas', component: FiltradorNotasComponent},
  {path: 'lista-carreras', component: ListaCarrerasComponent},
  {path: 'mapa-erasmus', component: MapaErasmusComponent},
  {path: 'ajustes-usuario', component: AjustesUsuarioComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
