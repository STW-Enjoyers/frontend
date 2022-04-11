import {Component, OnInit, ViewChild} from '@angular/core';
import * as ListaCarrerasConstants from "./lista-carreras.constants";
import {GradesService} from "../../services/grades.service";
import {HttpResponse} from "@angular/common/http";
import {Grade} from "../../models/Grade";
import {Subject} from "rxjs";
import {DataTableDirective} from "angular-datatables";
import {CITIES} from "./lista-carreras.constants";

@Component({
  selector: 'app-lista-carreras',
  templateUrl: './lista-carreras.component.html',
  styleUrls: ['./lista-carreras.component.css']
})
export class ListaCarrerasComponent implements OnInit {
  // Constants
  title:string = ListaCarrerasConstants.TITLE;
  placeholder = ListaCarrerasConstants.PLACEHOLDER;
  grades: Grade[] = [];
  // Filter values
  search!: string; /* Search bar value */
  cityIndex:number = 0;
  city = CITIES[this.cityIndex] /* Actual city displayed (Zaragoza or Huesca or ..) */
  // Datatables attributes
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild(DataTableDirective, {static: false})
  datatableElement!: DataTableDirective;

  constructor(private gradesService: GradesService) { }

  ngOnInit(): void {
    // Config external filter associated to custom search bar
    this.setExternalFilter()
    this.dtOptions = {
      pageLength: 10,
      search: true,
      dom:  '<<t>ip>',
      scrollX: true,
      scrollCollapse: true,
      "columnDefs": [
        {
          "targets": 0, // Carreras column
          "width": "30%",  //space with next column
          render: function ( data, type, row ) {
            // Handle large lines
            return data.length > 70
              ? data.substr( 0, 70 ) + "..."
              : data
          }
        }
      ],
      language: {
        zeroRecords: "No hemos encontrado ninguna carrera - disculpa",
        info: "Mostrando _TOTAL_ carreras",
        infoEmpty: "No hay carreras disponibles",
        infoFiltered: "",
        paginate: {
          first: "Primera página",
          last:"Última página",
          next:"Siguiente",
          previous: "Anterior"
        },
      }
    }
    // Get grades from backend and update datatables
    this.getGrades();
  }

  ngOnDestroy(): void {
    // Reset data table every time we leave the page
    this.dtTrigger.unsubscribe();
    // Unconfig external filter associated to custom search bar
    this.unsetExternalFilter()
  }

  // Get grades and update datatables
  getGrades(): void {
    this.gradesService
      .getGrades()
      .subscribe((grades) =>{
        grades = this.gradesService.filterByType(grades, this.gradesService.TYPES.GRADO);
        grades = this.gradesService.filterByCupo(grades, this.gradesService.CUPOS.GENERAL)
        grades = this.gradesService.renameCareers(grades);
        this.grades = grades;
        // Workaround to init datatables with dtOptions
        setTimeout(function() {
          // @ts-ignore
          this.dtTrigger.next();
        }.bind(this));
      })
  }

  nextCity() {
    this.cityIndex = this.mod(this.cityIndex + 1, CITIES.length)
    this.city = CITIES[this.cityIndex]
    this.updateDatatables()
  }

  previousCity() {
    this.cityIndex = this.mod(this.cityIndex - 1, CITIES.length)
    this.city = CITIES[this.cityIndex]
    this.updateDatatables()
  }

  // Update datatables when a user inserts a custom search or city changes
  updateDatatables(): void {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });
  }

  // Set an external filter to search by grade name and city
  // Code modified from: http://l-lin.github.io/angular-datatables/#/advanced/custom-range-search
  setExternalFilter() {
    $.fn['dataTable'].ext.search.push((settings: any, data: string[], dataIndex: any) => {
      const estudio:string = data[0]; // use data for the Carrera column
      const ciudad:string = data[2]; // use data for the Ciudad column
      if ((estudio.includes(this.search) || !this.search)
        && ciudad.includes(this.city.name)) {
        return true;
      }
      return false;
    });
  }

  // Unset an external filter to search by grade name
  // Code modified from: http://l-lin.github.io/angular-datatables/#/advanced/custom-range-search
  unsetExternalFilter() {
    // /!\ This is not the ideal solution as other components may add other search function in this array, so be careful when
    // handling this global variable
    $.fn['dataTable'].ext.search.pop();
  }

  // Calculate modulus.
  // % is not a modulus operator. It is a remainder operator
  mod(n: number, m: number) {
    return ((n % m) + m) % m;
  }
}
