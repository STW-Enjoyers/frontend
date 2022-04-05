import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {FiltradorNotasComponent} from "./pages/filtrador-notas/filtrador-notas.component";
import {ListaCarrerasComponent} from "./pages/lista-carreras/lista-carreras.component";
import {MapaErasmusComponent} from "./pages/mapa-erasmus/mapa-erasmus.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'filtrador-notas', component: FiltradorNotasComponent},
  {path: 'lista-carreras', component: ListaCarrerasComponent},
  {path: 'mapa-erasmus', component: MapaErasmusComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
