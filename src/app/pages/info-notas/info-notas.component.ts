import { Component, OnInit, ViewChild } from '@angular/core';
import * as InfoNotasConstants from "./info-notas.constants";
import { Chart, registerables } from 'chart.js';
import {GradesService} from "../../services/grades.service";
import {Grade} from "../../models/Grade";

@Component({
  selector: 'app-info-notas',
  templateUrl: './info-notas.component.html',
  styleUrls: ['./info-notas.component.css']
})

export class InfoNotasComponent implements OnInit {
  // Constants
  left_title:string = InfoNotasConstants.LEFT_INFO_TITLE;
  left_text:string = InfoNotasConstants.LEFT_INFO_TEXT;
  right_title:string = InfoNotasConstants.RIGHT_INFO_TITLE;
  right_facts = InfoNotasConstants.RIGHT_INFO_FACTS;
  graphic_title:string = InfoNotasConstants.GRAPHIC_TITLE;

  chartShown:number = 0;

  result:any;
  limit:number = 14; /* Limit value */
  gradesZaragoza:Grade[] = [];
  gradesTeruel:Grade[] = [];
  gradesHuesca:Grade[] = [];
  chart:any = []

  constructor(private gradesService: GradesService) { 
    Chart.register(...registerables)
  }

  ngOnInit(): void {
    // Add custom filters (name and city)
    //this.setExternalFilter()
    // Get grades and initialize datatables
    this.getGrades();
  }

  // Get grades and update datatables
  getGrades(): void {
    this.gradesService
      .getGrades()
      .subscribe((grades) =>{
        grades = this.gradesService.filterByType(grades, this.gradesService.TYPES.GRADO)
        grades = this.gradesService.filterByCupo(grades, this.gradesService.CUPOS.GENERAL)
        grades = this.gradesService.renameCareers(grades);

        console.log(grades);

        this.gradesZaragoza = this.gradesService.filterByCity(grades, this.gradesService.CITIES.ZARAGOZA);
        this.gradesTeruel = this.gradesService.filterByCity(grades, this.gradesService.CITIES.TERUEL);
        this.gradesHuesca = this.gradesService.filterByCity(grades, this.gradesService.CITIES.HUESCA);

        this.gradesZaragoza = this.getTopData(this.gradesZaragoza);
        this.newChart('zaragozaChart', this.gradesZaragoza, 'Nota de corte en Zaragoza');

        this.gradesTeruel = this.getTopData(this.gradesTeruel);
        this.newChart('teruelChart', this.gradesTeruel, 'Nota de corte en Teruel');

        this.gradesHuesca = this.getTopData(this.gradesHuesca);
        this.newChart('huescaChart', this.gradesHuesca, 'Nota de corte en Huesca');
      });
  }

  // Order data to show in charts
  getTopData(grades: Grade[]) {
    grades.sort((a,b) => b.nota - a.nota);
  
    //Issue: Duplicated objects, so we pick the even

    return grades;
  }

  newChart(id:string, grades:Grade[], labelText:string) {
    this.chart = new Chart(id, {
      type: 'bar',
      data: {
        labels: [
          grades[0].estudio,
          grades[2].estudio,
          grades[4].estudio,
          grades[6].estudio,
          grades[8].estudio
        ],
        datasets: [{
          label: labelText,
          data: [
            grades[0].nota,
            grades[2].nota,
            grades[4].nota,
            grades[6].nota,
            grades[8].nota
          ],
          borderWidth: 2,
          backgroundColor: '#6257f8',
        }],
      },
      options: {
        indexAxis: 'y',
      }
    })
  }

  // Change visibility of charts
  showChart(chartNum:number) {
    this.chartShown = chartNum;
  }
}
