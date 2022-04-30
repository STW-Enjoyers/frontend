import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-perfil-carrera',
  templateUrl: './perfil-carrera.component.html',
  styleUrls: ['./perfil-carrera.component.css']
})
export class PerfilCarreraComponent implements OnInit {
  id!: string;

  constructor(  private route: ActivatedRoute) {}

  ngOnInit(): void {
      if (this.route.snapshot.paramMap.get('id') != "undefined") {
        this.id = <string>this.route.snapshot.paramMap.get('id')
      } else {
        throw new Error("El id recibido por el perfil de una carrera es undefined")
      }
  }

}
