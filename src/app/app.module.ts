import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HomeComponent} from "./pages/home/home.component";
import {ButtonComponent} from "./components/button/button.component";
import { HeaderComponent } from './components/header/header.component';
import { FiltradorNotasComponent } from './pages/filtrador-notas/filtrador-notas.component';
import { ListaCarrerasComponent } from './pages/lista-carreras/lista-carreras.component';
import { MapaErasmusComponent } from './pages/mapa-erasmus/mapa-erasmus.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ButtonComponent,
    HeaderComponent,
    FiltradorNotasComponent,
    ListaCarrerasComponent,
    MapaErasmusComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
