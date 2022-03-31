import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }

  goToPage(link:string): void {
    //TODO: Navigate to link
  }

  // Static content
  help: string = "¿No has encontrado lo que buscabas?";
  unizarLink = "https://www.unizar.es";
  cards:Card[] = [
    {
      title:"Te ayudamos a elegir la carrera que mejor puede adaptarse a ti",
      subtitle:"Podrás ver comentarios de otros alumnos y estadísticas de la carrera.",
      buttonText:"Ver carreras",
      buttonLink:"",
    },
    {
      title:"¿Quieres saber a qué carreras puedes aspirar con tu nota?",
      subtitle:"No necesitas buscar, sólo ingresa tu nota de corte y nosotos nos ocupamos.",
      buttonText:"Notas de corte",
      buttonLink:"",
    },
    {
      title:"¿Necesitas información para Erasmus?",
      subtitle:"Te mostramos los sitios más elegidos por los estudiantes con un mapa interactivo.",
      buttonText:"Erasmus",
      buttonLink:"",
    }
  ];

}

interface Card {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
}
