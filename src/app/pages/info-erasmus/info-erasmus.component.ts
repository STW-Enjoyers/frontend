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
  left_text_top:string = InfoErasmusConstants.LEFT_INFO_TEXT_TOP;
  left_text_bot:string = InfoErasmusConstants.LEFT_INFO_TEXT_BOT;
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
    this.erasmusService.getErasmusIn().subscribe(
      (erasmus: any) => {
        this.chart = new Chart('plazasChart', {
          type: 'bar',
          data: {
            labels: [
              erasmus.pais
            ],
            datasets: [{
              label: 'Plazas para estudiar en otros destinos',
              data: [
                erasmus.plazas
              ],
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

  // Erasmus from Unizar to other foreign countries
  getErasmusOut() {
    this.erasmusService.getErasmusOut().subscribe(
      (erasmus: Erasmus[]) => {
        console.log(erasmus);

        let erasmusPaises:string[] = []
        let erasmusPlazas:number[] = []

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
