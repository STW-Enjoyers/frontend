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
    console.log(history)
    this.id = history.state.data
  }

}
