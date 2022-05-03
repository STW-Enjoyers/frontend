import { Component, OnInit } from '@angular/core';
import * as InfoErasmusConstants from "./info-erasmus.constants";
import { Chart, registerables } from 'chart.js';
import {ErasmusService} from "../../services/erasmus.service";
import {Erasmus} from "../../models/Erasmus";

@Component({
  selector: 'app-info-erasmus',
  templateUrl: './info-erasmus.component.html',
  styleUrls: ['./info-erasmus.component.css']
})
export class InfoErasmusComponent implements OnInit {
  // Constants
  left_title:string = InfoErasmusConstants.LEFT_INFO_TITLE;
  first_text:string = InfoErasmusConstants.FIRST_TEXT;
  second_text:string = InfoErasmusConstants.SECOND_TEXT;
  third_text:string = InfoErasmusConstants.THIRD_TEXT;
  graphic_plazas_title:string = InfoErasmusConstants.GRAPHIC_PLAZAS_TITLE;
  graphic_destinos_title:string = InfoErasmusConstants.GRAPHIC_DESTINOS_TITLE;

  chart:any = []

  constructor(private erasmusService: ErasmusService) {
    Chart.register(...registerables)
  }

  ngOnInit(): void {
    this.getErasmusOut()
    this.getErasmusIn()
  }

  // Erasmus from other foreign countries to Unizar
  getErasmusIn() {
    this.erasmusService.getErasmusInAll().subscribe(
      (erasmus: Erasmus[]) => {
        let erasmusPaises:string[] = []
        let erasmusPlazas:number[] = []

        // Alphabetical sort
        erasmus.sort((a,b)=>a.pais.localeCompare(b.pais))

        for (let i = 0; i < erasmus.length; i++) {
          erasmusPaises[i] = erasmus[i].pais
          erasmusPlazas[i] = erasmus[i].plazas
        }

        this.chart = new Chart('plazasChart', {
          type: 'bar',
          data: {
            labels: erasmusPaises,
            datasets: [{
              label: 'Plazas',
              data: erasmusPlazas,
              borderWidth: 2,
              backgroundColor: '#128100',
            }],
          },
          options: {
            indexAxis: 'y',
          }
        })
    })
  }

  // Erasmus from Unizar to other foreign countries
  getErasmusOut() {
    this.erasmusService.getErasmusOut().subscribe(
      (erasmus: Erasmus[]) => {
        let erasmusPaises:string[] = []
        let erasmusPlazas:number[] = []

        // Alphabetical sort
        erasmus.sort((a,b)=>a.pais.localeCompare(b.pais))

        for (let i = 0; i < erasmus.length; i++) {
          erasmusPaises[i] = erasmus[i].pais
          erasmusPlazas[i] = erasmus[i].plazas
        }

        this.chart = new Chart('destinosChart', {
          type: 'bar',
          data: {
            labels: erasmusPaises,
            datasets: [{
              label: 'Plazas',
              data: erasmusPlazas,
              borderWidth: 2,
              backgroundColor: '#6257f8',
            }],
          },
          options: {
            indexAxis: 'y',
          }
        })
    })
  }

}
