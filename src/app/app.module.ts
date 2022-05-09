import {ErrorHandler, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { DataTablesModule } from "angular-datatables";


import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HomeComponent } from "./pages/home/home.component";
import { ButtonComponent } from "./components/button/button.component";
import { HeaderComponent } from './components/header/header.component';
import { FiltradorNotasComponent } from './pages/filtrador-notas/filtrador-notas.component';
import { ListaCarrerasComponent } from './pages/lista-carreras/lista-carreras.component';
import { MapaErasmusComponent } from './pages/mapa-erasmus/mapa-erasmus.component';
import { RegistroComponent } from './pages/registro/registro.component';

import { UserService } from './services/user.service';

import { AuthGuard } from './guards/auth.guard';
import { AuthInterceptor } from './guards/auth.interceptor';
import { LoginComponent } from './pages/login/login.component';
import { AjustesUsuarioComponent } from './pages/ajustes-usuario/ajustes-usuario.component';
import {ServerErrorInterceptor} from "./guards/error.interceptor";
import {GlobalErrorHandler} from "./global-error-handler";
import { FooterComponent } from './components/footer/footer.component';
import { PerfilCarreraComponent } from './pages/perfil-carrera/perfil-carrera.component';
import { CommentComponent } from './components/comment/comment.component';
import { ResponseComponent } from './components/response/response.component';
import { InfoNotasComponent } from './pages/info-notas/info-notas.component';
import { InfoErasmusComponent } from './pages/info-erasmus/info-erasmus.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ButtonComponent,
    HeaderComponent,
    FiltradorNotasComponent,
    ListaCarrerasComponent,
    MapaErasmusComponent,
    RegistroComponent,
    LoginComponent,
    AjustesUsuarioComponent,
    FooterComponent,
    PerfilCarreraComponent,
    CommentComponent,
    ResponseComponent,
    InfoNotasComponent,
    InfoErasmusComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LeafletModule,
    DataTablesModule,
    MdbDropdownModule,
    MdbCollapseModule,
    BrowserAnimationsModule
  ],
  providers: [
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ServerErrorInterceptor, multi: true },
    UserService,
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
